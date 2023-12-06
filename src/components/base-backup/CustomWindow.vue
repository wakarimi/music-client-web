<template>
  <div
      class="custom-window-background"
      @click="handleBackgroundClick"
  >
    <div
        class="custom-window"
        @click.stop
    >
      <slot>

      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits([
  'background-click'
]);

function handleBackgroundClick() {
  emit('background-click');
}
</script>

<style scoped>
.custom-window-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #252323AA;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-window {
  background-color: #FFFFFF;
  border-color: #F0EAE4;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  min-width: 2%;
  min-height: 2%;
  max-width: 80%;
  max-height: 80%;
  padding: 10px;
  overflow-y: auto;
}
</style>