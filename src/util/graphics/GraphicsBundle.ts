import * as TWEEN from '@tweenjs/tween.js';
import {
    AmbientLight,
    Box3,
    DirectionalLight,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Object3D,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Sphere,
    SphereGeometry,
    Vector2,
    Vector3,
    WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useModelAttributesStore } from '../../store/ModelAttributes';
import { useModelPropertiesStore } from '../../store/ModelProperties';
import type { ViewerBundle } from '../ViewerBundle';

const PROTON_SCENE_AMBIENT_LIGHT_COLOR = 0x555555;
const PROTON_SCENE_DIRECTIONAL_LIGHT_COLOR = 0xcccccc;
const DEFAULT_PERSPECTIVE_DISTANCE = 1.75;
const NUM_POINTS_PER_TRIANGLE = 3;
const ZOOM_ANIMATION_DURATION = 50;

function displayModel( model: Object3D ) {

    const protonScene = new Scene();
    protonScene.background = null;

    const mainLight = new AmbientLight( PROTON_SCENE_AMBIENT_LIGHT_COLOR );
    const spotLight = new DirectionalLight( PROTON_SCENE_DIRECTIONAL_LIGHT_COLOR );
    
    const protonCanvas = document.querySelector('#ProtonModelViewer');
    protonCanvas?.childNodes.forEach((node) => {
        protonCanvas.removeChild( node );
    });
    protonScene.add( mainLight, spotLight );

    const protonCamera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize( window.innerWidth, window.innerHeight );

    const controls = new OrbitControls( protonCamera, renderer.domElement );
    controls.enablePan = false;

    protonCanvas?.appendChild( renderer.domElement );

    const initialBoxModel = new Box3().setFromObject( model );
    const modelCenter = {
        x: ( initialBoxModel.min.x + initialBoxModel.max.x ) / 2,
        y: ( initialBoxModel.min.y + initialBoxModel.max.y ) / 2,
        z: ( initialBoxModel.min.z + initialBoxModel.max.z ) / 2
    };

    model.translateX( -modelCenter.x );
    model.translateY( -modelCenter.y );
    model.translateZ( -modelCenter.z );

    const updatedBoxModel = new Box3().setFromObject( model );
    const protonModelBoundingSphere = new Sphere();
    updatedBoxModel.getBoundingSphere( protonModelBoundingSphere );

    const refDistance = DEFAULT_PERSPECTIVE_DISTANCE * protonModelBoundingSphere.radius;
    protonCamera.position.set(
        refDistance,
        refDistance,
        refDistance
    );

    controls.minDistance = Math.sqrt(
        ( refDistance * refDistance ) +
        ( refDistance * refDistance )
    );

    const protonGroup = new Group();
    protonGroup.add( model );

    const sphereGeometry = new SphereGeometry( DEFAULT_PERSPECTIVE_DISTANCE * protonModelBoundingSphere.radius );
    const protonCameraSphere = new Mesh( sphereGeometry, new MeshLambertMaterial({
        transparent: true,
        opacity: 0.0
    }));

    protonScene.add( protonGroup, protonCameraSphere );

    // TODO Replace with state for showing model obfuscator
    const modelObfuscator = document.querySelector('#ModelObfuscator');
    modelObfuscator?.classList.add("show");

    let numVertices = 0;
    let numTriangles = 0;

    model.traverse((object) => {

        /**
         * Tracks the number of vertices and triangles
         * in the present model file - for indexed geometry,
         * use the index count for the number of triangles,
         * otherwise delegate back to use the positional count
         */
        const mesh = object as Mesh;

        if( mesh.geometry ) {
            numVertices += mesh.geometry.attributes.position.count;
            if( mesh.geometry.index != null ) {
                numTriangles += mesh.geometry.index.count / NUM_POINTS_PER_TRIANGLE;
            }
            else {
                numTriangles += mesh.geometry.attributes.position.count / NUM_POINTS_PER_TRIANGLE;
            }
        }
    });

    const modelPropertiesStore = useModelPropertiesStore();
    const modelAttributesStore = useModelAttributesStore();

    const viewerBundle: ViewerBundle = {
        scene: protonScene,
        camera: protonCamera,
        boundingSphere: protonModelBoundingSphere,
        cameraSphere: protonCameraSphere
    };
    modelPropertiesStore.viewerBundle = viewerBundle;

    function resize() {
        protonCamera.aspect = window.innerWidth / window.innerHeight;
        protonCamera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( protonScene, protonCamera );
    }
    resize();

    function animate() {
        const animationId = requestAnimationFrame( animate );
        modelAttributesStore.currentAnimationId = animationId;
        controls.update();

        const lightPos = new Vector3();
        lightPos.set( protonCamera.position.x, protonCamera.position.y, protonCamera.position.z );
        spotLight.position.copy( lightPos );

        renderer.render( protonScene, protonCamera );

        TWEEN.update();
    }

    const previousAnimationId = modelAttributesStore.currentAnimationId;
    cancelAnimationFrame( previousAnimationId );
    animate();
    
    adjustProtonCamera( 0 );
    
    modelAttributesStore.numVertices = numVertices;
    modelAttributesStore.numTriangles = numTriangles;

    window.addEventListener('resize', () => {
        resize();
    });
}

function resetProtonCamera() {
    adjustProtonCamera( ZOOM_ANIMATION_DURATION );
}

function adjustProtonCamera( animationDuration: number ) {

    const modelPropertiesStore = useModelPropertiesStore();
    const viewerBundle = modelPropertiesStore.viewerBundle;

    const protonScene = viewerBundle.scene;
    const protonCamera = viewerBundle.camera;
    const protonCameraSphere = viewerBundle.cameraSphere;

    const raycaster = new Raycaster();
    const pointer = new Vector2(0, 0);
    raycaster.setFromCamera( pointer, protonCamera );

    const intersects = raycaster.intersectObjects( protonScene.children );
    const sphereIntersect = intersects.filter((intersect) => {
        return intersect.object === protonCameraSphere;
    });
    const spherePoint = sphereIntersect[0].point.clone().multiplyScalar( 1.75 );

    new TWEEN.Tween({
        x: protonCamera.position.x,
        y: protonCamera.position.y,
        z: protonCamera.position.z
    })
    .to({
        x: spherePoint.x,
        y: spherePoint.y,
        z: spherePoint.z
    }, animationDuration)
    .easing( TWEEN.Easing.Linear.None )
    .onUpdate((coords) => {
        protonCamera.position.set(
            coords.x,
            coords.y,
            coords.z
        );
    })
    .onComplete(() => {
        const modelObfuscator = document.querySelector('#ModelObfuscator');
        modelObfuscator?.classList.remove("show");
    })
    .start();
}

export { displayModel, resetProtonCamera };