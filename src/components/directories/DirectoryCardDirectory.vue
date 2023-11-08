<template>
  <div class="directory-card-directory-container">
    <button class="directory-card-directory-item" @click="emitDirectory(attachedDirId)">

      <div class="button-image">
        <img :src="directoryIcon" alt="directoryIcon">
      </div>

      <span class="button-text">
        {{ buttonText }}
      </span>

    </button>
  </div>
</template>

<script setup lang="ts">
import directoryIcon from "@/assets/default/directory.svg"

defineProps({
  buttonText: String,
  attachedDirId: Number,
});

const emit = defineEmits(['change-directory']);

function emitDirectory(dirId: number) {
  emit('change-directory', dirId);
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.directory-card-directory-container {
  position: relative;
}

.directory-card-directory-item {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-color: #F0EAE4;
  border-style: solid;
  background-color: #FAF8F6;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 0 0 #00000000;
}

.directory-card-directory-item:hover {
  transform: scale(1.02);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
}

.directory-card-directory-item:active {
  transform: scale(0.98);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
}

.button-image {
  width: 100%;
  padding-top: 100%;
  position: relative;
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
}

.button-text {
  margin: 4px;
  font-size: 14px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 24px;
  line-height: 12px;
}

</style>