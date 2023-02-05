import { Mesh, PerspectiveCamera, Scene, Sphere } from "three"

export interface ViewerBundle {
    scene: Scene,
    camera: PerspectiveCamera,
    boundingSphere: Sphere,
    cameraSphere: Mesh
};