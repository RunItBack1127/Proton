import { Mesh, PerspectiveCamera, Scene, Sphere } from "three"

export interface ViewerBundle {
    scene: Scene | null,
    camera: PerspectiveCamera | null,
    cameraSphere: Mesh | null
};