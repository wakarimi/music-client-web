<template>
  <div class="category-item">
    <div class="button-image">
      <slot name="image"></slot>
    </div>
    <span class="button-text">{{ buttonText }}</span>
    <div class="controls">
      <button class="play-button" @click="playTrack">
        <img :src="playButton" alt="Воспроизвести">
      </button>
      <button class="delete-button" @click="deleteTrack">
        <img :src="removeButton" alt="Удалить">
      </button>
    </div>
    <span class="track-duration">3:45</span>
  </div>
</template>

<script lang="ts" setup>
import playButton from "@/assets/queue/play.svg"
import removeButton from "@/assets/queue/remove.svg"

defineProps({
  buttonText: String
});

function playTrack() {

}

function deleteTrack() {

}
</script>

<style scoped>

.category-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  width: 100%;
  position: relative;
  border-radius: 1vh;
  background-color: #FAF8F6;
}

.button-image {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 1vh;
  overflow: hidden;
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-text {
  flex-grow: 1;
  margin-right: 10px; /* Добавьте отступ, чтобы текст не прилипал к продолжительности */
  font-size: 0.75vw;
}

.track-duration {
  white-space: nowrap; /* Удерживает продолжительность на одной строке */
}

.controls {
  align-items: center;
  margin-right: 10px; /* Добавьте отступ справа, чтобы отделить от продолжительности */
  display: none; /* Скрывать кнопки, когда мышь не наведена */
}

.category-item:hover .controls {
  display: flex; /* Показывать кнопки при наведении */
}

.move-button img {
  width: 24px; /* Установите желаемый размер для картинок */
  height: 24px;
}

.move-button {
  background: none; /* Убрать фоновое изображение, так как теперь используются img внутри */
  border: none;
  padding: 0; /* Убрать padding если он есть */
  margin: 0 5px; /* Добавить немного отступа между кнопками */
}

.play-button img,
.delete-button img {
  width: 24px; /* Установите желаемый размер для картинок */
  height: 24px;
}

.play-button,
.delete-button {
  background: none; /* Убрать фоновое изображение, так как теперь используются img внутри */
  border: none;
  padding: 0; /* Убрать padding если он есть */
  margin: 0 5px; /* Добавить немного отступа между кнопками */
}

/* Добавьте стили для расстояния между кнопками, если это необходимо */
.controls > button:not(:last-child) {
  margin-right: 10px;
}

/* Добавьте стили для кнопок, чтобы они выглядели как вам нужно */
</style>
