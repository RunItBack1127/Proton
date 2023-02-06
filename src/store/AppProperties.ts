import { defineStore } from "pinia";

const useAppPropertiesStore = defineStore('properties', {
    state: () => {
        return {
            isLoadingModel: false,
            isDisplayingModel: false,
            isShowingModelStats: false
        }
    }
});

export { useAppPropertiesStore };