<script setup lang="ts">
import ObjectInfoWidget from './components/ObjectInfoWidget.vue';
import OptionsPanel from './components/OptionsPanel.vue';
import ViewerPropertiesPanel from './components/ViewerPropertiesPanel.vue';

import { ModelLoadCompleteEvent } from './util/types/ModelLoadCompleteEvent';
import { onModelLoaded } from './util/graphics/GraphicsBundle';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

window.addEventListener('PROTON_ModelLoadComplete', (e: Event) => {

  const event = e as ModelLoadCompleteEvent;
  const model = event.model;

  onModelLoaded( model );
});

function emitProtonEvent() {
  const loader = new OBJLoader();
  loader.load('https://raw.githubusercontent.com/RunItBack1127/bumbox-cas-website/main/src/assets/models/UE_MEGABOOM.gltf', (model) => {
    const mlcEvent = new ModelLoadCompleteEvent(model);
    window.dispatchEvent(mlcEvent);
  });
}
</script>

<template>
  <button @click="emitProtonEvent"></button>
  <div id="ProtonModelViewer"></div>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -100000;
}
</style>
