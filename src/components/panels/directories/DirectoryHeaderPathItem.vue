<template>
  <button class="path-item-button" @click="emitDirectory(attachedDirId)">
    <slot name="name"></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttonText: String,
  attachedDirId: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(['change-directory']);

function emitDirectory(dirId: number) {
  emit('change-directory', dirId);
}
</script>

<style scoped>

.path-item-button {
  height: 100%;
  padding: 5px;
  background-color: #F5F1ED;
  border-radius: 10px;
  border-color: #F0EAE4;
  border-style: solid;
  cursor: pointer;
  transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      border-color 0.15s ease,
      background-color 0.15s ease;
}
.path-item-button img {
  height: 100%;
}

.path-item-button:hover {
  transform: scale(1.1);
  box-shadow: 1px 1px 4px #25232377;
  background-color: #F0EAE4;
  border-color: #EBE3DB;
}

.path-item-button:active {
  transform: scale(0.9);
  box-shadow: 0.5px 0.5px 2px #25232377;
  background-color: #F0EAE4;
  border-color: #EBE3DB;
}
</style>