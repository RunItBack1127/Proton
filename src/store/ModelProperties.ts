import { defineStore } from "pinia";
import { Mesh, PerspectiveCamera, Scene, Sphere } from "three";
import { ViewerBundle } from "../util/ViewerBundle";

const useModelPropertiesStore = defineStore('properties', {
    state: () => {
        return {
            viewerBundle: {
                scene: new Scene(),
                camera: new PerspectiveCamera(),
                boundingSphere: new Sphere(),
                cameraSphere: new Mesh()
            }
        }
    }
});

export { useModelPropertiesStore };