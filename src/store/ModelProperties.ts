import { defineStore } from "pinia";

const useModelPropertiesStore = defineStore('properties', {
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

export { useModelPropertiesStore };