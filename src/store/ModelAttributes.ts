import { defineStore } from "pinia";

const attributeStore = defineStore('attributes', {
    state: () => {
        return {
            currentAnimationId: 0,
            numVertices: 0,
            numTriangles: 0,
            loadDuration: 0
        }
    },
    actions: {
        setAnimationId(animationId: number) {
            this.currentAnimationId = animationId;
        },
        setNumVertices(numVertices: number) {
            this.numVertices = numVertices;
        },
        setNumTriangles(numTriangles: number) {
            this.numTriangles = numTriangles;
        },
        setLoadDuration(loadDuration: number) {
            this.loadDuration = loadDuration;
        }
    }
});

export default attributeStore;