<script setup lang="ts">
import ObjectInfoWidget from './components/ObjectInfoWidget.vue';
import OptionsPanel from './components/OptionsPanel.vue';
import ViewerPropertiesPanel from './components/ViewerPropertiesPanel.vue';

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

</style>
