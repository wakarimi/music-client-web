<template>
  <div
      class="custom-song-row"
  >
    <button
        class="song-row-button"
    >
      <div class="song-row-left">
        <img
            class="song-cover"
            :src="getSongCover()"
            alt="song-cover">
      </div>
      <div class="song-row-right">
        <CustomButton
            class="control-button right-element"
          :button-icon="infoIcon"
          button-padding="4px"
            :size-change-percent="2"
        />
        <CustomButton
            class="control-button right-element"
            :button-icon="addIcon"
            button-padding="4px"
            :size-change-percent="2"
        />
        <CustomButton
            class="control-button right-element"
            :button-icon="playIcon"
            button-padding="4px"
            :size-change-percent="2"
        />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import defaultCover from "@/assets/default/cover.svg"
import CustomButton from "@/components/base/CustomButton.vue";
import infoIcon from "@/assets/icons/song-row/info.svg"
import addIcon from "@/assets/icons/song-row/add.svg"
import playIcon from "@/assets/icons/song-row/play.svg"

function getSongCover(): string {
  return defaultCover
}
</script>

<style scoped>
.song-row-button {
  width: 100%;
  height: 100%;

  background-color: #FAF8F6;
  border-color: #F0EAE4;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s ease,
  box-shadow 0.2s ease;
}

.song-row-button:hover {
  transform: scale(1.005);
  box-shadow: 1px 1px 3px #25232344;
}

.song-row-button:active {
  transform: scale(0.995);
  box-shadow: 1px 1px 2px #25232344;
}

.song-row-left {
  display: flex;
  flex-direction: row;
  margin-right: auto;
  position: relative;
  height: 100%;
}

.song-row-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
}

.song-cover {
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  position: relative;
  border-radius: 10px;
}

.song-cover >>> img {
  height: 100%;
}

.control-button {
  height: 80%;
}

.right-element {
  padding-right: 4px;
}
</style>