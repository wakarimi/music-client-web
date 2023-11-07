<template>
  <button class="album-item">
    <div class="button-image">
      <slot name="image"></slot>
    </div>
    <span class="button-text">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttonText: String
});
</script>

<style scoped>

* {
  margin: 0px;
  padding: 0px;
}

.album-item {
  border-radius: 1.25vh;
  border-color: #F5F1ED;
  background-color: #FAF8F6;
  display: flex;
  cursor: pointer;
  outline: none;
  width: 100%; /* Кнопка занимает всё горизонтальное пространство */
  height: auto; /* Высота кнопки настраивается контентом внутри */
  flex-direction: column; /* Элементы теперь будут располагаться вертикально */
  align-items: center; /* Центрирует элементы по горизонтали */
  justify-content: center; /* Опционально, центрирует элементы по вертикали */
  padding-bottom: 10px; /* Добавлен отступ для внешнего вида */
}

.button-image {
  margin-bottom: 10px; /* Добавьте отступ снизу, чтобы отделить изображение от текста */
  border-radius: 1vh;
  width: 100%; /* Ширина для картинки */
  height: 100%; /* Высота для картинки, чтобы сделать её квадратной */
  overflow: hidden;
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-text {
  flex-grow: 1;
  font-size: 0.75vw;
  display: flex;
  align-items: center; /* Это свойство может быть уже не нужно, так как текст будет на новой строке */
}
</style>
