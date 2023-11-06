<template>
  <div class="group-category">
    <button class="category-button">
      <div class="button-image">
        <slot name="image"><!-- Слот для изображения --></slot>
      </div>
      <span class="button-text">{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  buttonText: String
});
</script>

<style scoped>
.group-category {
  padding: 10px;
}

.category-button {
  border-radius: 1vh;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 100%; /* Кнопка занимает всё горизонтальное пространство */
  height: auto; /* Высота кнопки настраивается контентом внутри */
}

.button-image {
  background-color: #ccc;
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
  display: flex;
  align-items: center;
}
</style>
