<template>
  <div class="directory-card-directory-container">
    <button class="directory-card-directory-item" @click="emitDirectory(attachedDirId)">

      <div class="button-image">
        <img :src="directoryIcon" alt="directoryIcon">

        <button class="extra-button add">
          <img :src="addIcon" alt="Добавить в плейлист" />
        </button>
        <button class="extra-button play">
          <img :src="playIcon" alt="Воспроизвести" />
        </button>
      </div>

      <span class="button-text">
        {{ buttonText }}
      </span>

    </button>
  </div>
</template>

<script setup lang="ts">
import directoryIcon from "@/assets/default/directory.svg"
import addIcon from "@/assets/control/add.svg";
import playIcon from "@/assets/control/play.svg";

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
  padding: 1px;
  margin: 3px;
  font-size: 14px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 28px;
  line-height: 14px;
}

.extra-button {
  position: absolute;
  top: 10px;
  right: 50px;
  width: 30px;
  height: 30px;
  background-color: #F5F1ED;
  border: none;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 10;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}


.extra-button img {
  height: 50%;
  width: 50%;
  padding: 5px;
  background-color: #F5F1ED;
  border-radius: 10px;
  border-color: #F0EAE4;
  border-style: solid;
  cursor: pointer;
}

.button-image:hover .extra-button {
  opacity: 0.8;
}

.play {
  bottom: 10px;
  right: 10px;
}

</style>