<template>
  <div class="tab-list">
    <CustomButton
      class="tab-item"
      v-for="controlButton in controlButtons"
      contentPosition="left"
      text-size="16px"
      button-padding="10px"
      :key="controlButton.type"
      :button-type="controlButton.type"
      :button-text="controlButton.text"
      :button-icon="controlButton.icon"
      @click="emitCategory(controlButton.type)"
    />
  </div>
</template>

<script setup lang="ts">
import categoryNow from "@/assets/icons/category/category-now.svg"
import categoryLast from "@/assets/icons/category/category-last.svg"
import categoryAlbums from "@/assets/icons/category/category-albums.svg"
import categoryArtists from "@/assets/icons/category/category-artists.svg"
import categoryGenres from "@/assets/icons/category/category-genres.svg"
import categoryPlaylists from "@/assets/icons/category/category-playlists.svg"
import categorySongs from "@/assets/icons/category/category-songs.svg"
import categoryDirectories from "@/assets/icons/category/category-directories.svg"
import CustomButton from "@/components/base/CustomButton.vue";

const controlButtons = [
  {text: "Текущее", type: "controlNow", icon: categoryNow},
  {text: "Недавние", type: "controlLast", icon: categoryLast},
  {text: "Альбомы", type: "controlAlbums", icon: categoryAlbums},
  {text: "Исполнители", type: "controlArtists", icon: categoryArtists},
  {text: "Жанры", type: "controlGenres", icon: categoryGenres},
  {text: "Плейлисты", type: "controlPlaylist", icon: categoryPlaylists},
  {text: "Дорожки", type: "controlSongs", icon: categorySongs},
  {text: "Файлы", type: "controlFiles", icon: categoryDirectories},
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