<template>
  <div class="tab-list">
    <CategoryButton button-text="Текущее" class="tab-item" @click="emitCategory('Текущее')">
      <template #image>
        <img :src=nowPlaying alt="Текущее">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Последние" class="tab-item" @click="emitCategory('Последние')">
      <template #image>
        <img :src=last alt="Последние">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Альбомы" class="tab-item" @click="emitCategory('Альбомы')">
      <template #image>
        <img :src=albums alt="Альбомы">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Исполнители" class="tab-item" @click="emitCategory('Исполнители')">
      <template #image>
        <img :src=artists alt="Исполнители">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Жанры" class="tab-item" @click="emitCategory('Жанры')">
      <template #image>
        <img :src=genres alt="Жанры">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Дорожки" class="tab-item" @click="emitCategory('Дорожки')">
      <template #image>
        <img :src=tracks alt="Дорожки">
      </template>
    </CategoryButton>
    <CategoryButton button-text="Файлы" class="tab-item" @click="emitCategory('Файлы')">
      <template #image>
        <img :src=files alt="Файлы">
      </template>
    </CategoryButton>
  </div>
</template>

<script setup lang="ts">
import CategoryButton from "@/components/CategoryButton.vue";
import nowPlaying from "@/assets/categories/now-playing.svg"
import files from "@/assets/categories/files.svg"
import albums from "@/assets/categories/albums.svg"
import artists from "@/assets/categories/artists.svg"
import last from "@/assets/categories/last.svg"
import tracks from "@/assets/categories/tracks.svg"
import genres from "@/assets/categories/genres.svg"

const emit = defineEmits(['change-panel']);

function emitCategory(categoryName: string) {
  emit('change-panel', categoryName);
}
</script>

<style scoped>
.tab-item {
  margin-bottom: 1vh;
}
</style>