<template>
  <div class="directory-card-audio-file-container">
    <button class="directory-card-audio-file-item">

      <div class="button-image">
        <img :src="currentCover" alt="coverIcon">

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
import coverIcon from "@/assets/default/cover.svg";
import {useDirsStore} from "@/stores/useDirsStore";
import {ref} from "vue";
import {onMounted} from "vue";
import addIcon from "@/assets/control/add.svg";
import playIcon from "@/assets/control/play.svg";

let currentCover = ref(coverIcon)
const dirsStore = useDirsStore();

const props = defineProps({
  buttonText: String,
  attachedAudioFileId: {
    type: Number,
    required: true
  },
});

onMounted(async () => {
  await getCover(props.attachedAudioFileId)
});

const getCover = async (audioFile: number): Promise<void> => {
  if (!dirsStore.bestCoverForAudioFile.has(audioFile)) {
    await dirsStore.fetchBestCoverForAudioFile(audioFile)
  }
  const cover = dirsStore.bestCoverForAudioFile.get(audioFile)
  if (!cover) {
    currentCover.value = coverIcon
  } else {
    currentCover.value = 'http://localhost:8022/api/covers/' + cover + '/image'
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.directory-card-audio-file-container {
  position: relative;
}

.directory-card-audio-file-item {
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

.directory-card-audio-file-item:hover {
  transform: scale(1.02);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
}

.directory-card-audio-file-item:active {
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