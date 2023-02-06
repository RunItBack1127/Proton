<script setup lang="ts">
import { computed } from 'vue';
import ObjectInfoWidget from './components/ObjectInfoWidget.vue';
import OptionsPanel from './components/OptionsPanel.vue';
import ViewerPropertiesPanel from './components/ViewerPropertiesPanel.vue';
import LoadingScreen from './components/LoadingScreen.vue';

import { ModelLoadCompleteEvent } from './util/types/ModelLoadCompleteEvent';
import { displayModel } from './util/graphics/GraphicsBundle';
import { useAppPropertiesStore } from './store/AppProperties';

const appProperties = useAppPropertiesStore();
const isLoadingModel = computed(() => appProperties.isLoadingModel);

window.addEventListener('PROTON_ModelLoadComplete', (e: Event) => {
  const event = e as ModelLoadCompleteEvent;
  const model = event.model;

  displayModel( model );

  appProperties.isLoadingModel = false;
  appProperties.isDisplayingModel = true;

});
// Add event for model attributes instead of store
</script>

<template>
  <div id="ProtonModelViewer"></div>
  <div id="ModelObfuscator"></div>
  <div class="OptionsPanel">
    <options-panel />
  </div>
  <div v-show="isLoadingModel" class="LoadingScreen">
    <loading-screen />
  </div>
  <div class="ViewerPropertiesPanel">
    <viewer-properties-panel />
  </div>
  <div class="ObjectInfoWidget">
    <object-info-widget />
  </div>
</template>

<style scoped lang="scss">
#ProtonModelViewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

#ModelObfuscator {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10000;
}

#ModelObfuscator.show {
  display: block;
}

.LoadingScreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 10000;
}

.OptionsPanel {
  position: absolute;
  top: 25px;
  left: 45px;
  width: 260px;
  height: 80px;
  border-radius: 25%;
  z-index: 1000;
  box-shadow: rgba(100, 100, 111, 0.25) 0px 7px 29px 0px;
}
</style>
