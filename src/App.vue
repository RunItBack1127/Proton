<script setup lang="ts">
import ObjectInfoWidget from './components/ObjectInfoWidget.vue';
import OptionsPanel from './components/OptionsPanel.vue';
import ViewerPropertiesPanel from './components/ViewerPropertiesPanel.vue';

import { ModelLoadCompleteEvent } from './util/types/ModelLoadCompleteEvent';
import { onModelLoaded } from './util/graphics/GraphicsBundle';

window.addEventListener('PROTON_ModelLoadComplete', (e: Event) => {
  const event = e as ModelLoadCompleteEvent;
  const model = event.model;

  onModelLoaded( model );
});

// Add event for model attributes instead of store
</script>

<template>
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
#app {
  overflow: hidden;
}

#ProtonModelViewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
