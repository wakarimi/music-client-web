<template>
  <div class="tab-list">
    <BaseButton
        class="tab-item"
        v-for="controlButton in controlButtons"
        :key="controlButton.type"
        :button-text="controlButton.text"
        :button-type="controlButton.type"
        @buttonClick="emitCategory(controlButton.type)"
    >
      <template #image>
        <img :src="controlButton.image" :alt="controlButton.text">
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/base/interactive/button/ImageTextButton.vue";
import nowPlaying from "@/assets/categories/now-playing.svg"
import lastSongs from "@/assets/categories/last.svg"
import albums from "@/assets/categories/albums.svg"
import artists from "@/assets/categories/artists.svg"
import genres from "@/assets/categories/genres.svg"
import playlists from "@/assets/categories/genres.svg"
import tracks from "@/assets/categories/tracks.svg"
import files from "@/assets/categories/files.svg"

const controlButtons = [
  {text: "Текущее", type: "controlNow", image: nowPlaying},
  {text: "Недавние", type: "controlLast", image: lastSongs},
  {text: "Альбомы", type: "controlAlbums", image: albums},
  {text: "Исполнители", type: "controlArtists", image: artists},
  {text: "Жанры", type: "controlGenres", image: genres},
  {text: "Плеилисты", type: "controlPlaylist", image: playlists},
  {text: "Дорожки", type: "controlSongs", image: tracks},
  {text: "Файлы", type: "controlFiles", image: files},
]

const emit = defineEmits(['change-category']);

function emitCategory(categoryName: string) {
  emit('change-category', categoryName);
}
</script>

<style scoped>
.tab-list {
  padding: 10px;
}

.tab-item {
  margin-bottom: 1vh;
  min-height: 50px;
  height: 50px;
  max-height: 50px;
}
</style>