import { defineStore } from "pinia";

const useModelAttributesStore = defineStore('attributes', {
    state: () => {
        return {
            currentAnimationId: 0,
            numVertices: 0,
            numTriangles: 0,
            loadDuration: 0
        }
    }
});

export { useModelAttributesStore };