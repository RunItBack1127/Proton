<script setup lang="ts">
import ObjectInfoWidget from './components/ObjectInfoWidget.vue';
import OptionsPanel from './components/OptionsPanel.vue';
import ViewerPropertiesPanel from './components/ViewerPropertiesPanel.vue';

import { ModelLoadCompleteEvent } from './util/types/ModelLoadCompleteEvent';
import { displayModel } from './util/graphics/GraphicsBundle';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

window.addEventListener('PROTON_ModelLoadComplete', (e: Event) => {
  const event = e as ModelLoadCompleteEvent;
  const model = event.model;

  displayModel( model );
});
// Add event for model attributes instead of store
</script>

<template>
  <div id="ProtonModelViewer"></div>
  <div id="ModelObfuscator"></div>
  <nav class="OptionsPanel">
    <options-panel />
  </nav>
  <aside class="ViewerPropertiesPanel">
    <viewer-properties-panel />
  </aside>
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
</style>
