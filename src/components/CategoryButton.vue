<template>
  <button class="category-button">
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

.category-button {
  border-radius: 1vh;
  border-color: #F5F1ED;
  background-color: #FAF8F6;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 100%; /* Кнопка занимает всё горизонтальное пространство */
  height: auto; /* Высота кнопки настраивается контентом внутри */
}

.button-image {
  border-radius: 1vh;
  margin-right: 10px;
  width: 50px; /* Ширина для картинки */
  height: 50px; /* Высота для картинки, чтобы сделать её квадратной */
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
  align-items: center;
}
</style>
