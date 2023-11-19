<template>
  <div class="album-container">
    <button class="album-item">
      <div class="button-image">
        <button class="extra-button add">
          <img :src="addIcon" alt="Добавить в плейлист" />
        </button>
        <button class="extra-button play">
          <img :src="playIcon" alt="Воспроизвести" />
        </button>
        <slot name="image"></slot>
      </div>
      <span class="button-text">{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import playIcon from "@/assets/album-control/play.svg"
import addIcon from "@/assets/album-control/add.svg"

defineProps({
  buttonText: String
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.album-item {
  width: 100%;
  height: 100%;
  cursor: pointer;

  border-radius: 1vh;
  border-color: #F0EAE4;
  border-style: solid;

  background-color: #FAF8F6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Добавляем плавные переходы для трансформации и тени */
  box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* Начальное состояние тени: прозрачная */
}

.album-item:hover {
  transform: scale(1.02); /* Увеличиваем размер компонента на 5% */
  box-shadow: 0 0.3rem 15px rgba(0, 0, 0, 0.3); /* Добавляем тень при наведении */
}

.album-item:active {
  transform: scale(0.98); /* Уменьшаем кнопку до 98% от исходного размера */
  box-shadow: 0 0.2rem 10px rgba(0, 0, 0, 0.2); /* Уменьшаем тень, чтобы создать эффект вдавливания */
}

.button-image {
  width: 100%; /* Ширина обложки равна 100% родителя */
  padding-top: 100%; /* Верхний отступ равный ширине делает элемент квадратным */
  position: relative; /* Для позиционирования изображения */
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 1vh;
}

.button-text {
  margin: 0.5vh;

  font-size: 1em;
  text-align: center;

  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 2.4em;
  line-height: 1.2em;
}

.album-container {
  position: relative;
}

.extra-button {
  position: absolute;
  bottom: 10px;
  right: 50px;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 10;
}

.extra-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.album-container:hover .extra-button {
  opacity: 1;
}

.play {
  bottom: 10px;
  right: 10px;
}

</style>
