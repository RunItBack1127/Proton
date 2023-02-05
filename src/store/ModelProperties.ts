import { defineStore } from "pinia";

const modelPropertiesStore = defineStore('properties', {
    state: () => {
        return {
            viewerBundle: null
        }
    },
    actions: {
        setViewerBundle(viewerBundle: any) {
            this.viewerBundle = viewerBundle;
        }
    }
});

export default modelPropertiesStore;