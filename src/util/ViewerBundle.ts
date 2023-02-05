import { PerspectiveCamera, Scene, Sphere } from "three"

export type ViewerBundle = {
    scene: Scene,
    camera: PerspectiveCamera,
    boundingSphere: Sphere,
    cameraSphere: Sphere
};