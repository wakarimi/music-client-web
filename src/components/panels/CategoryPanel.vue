<template>
  <div class="tab-list">
    <CustomButton
        v-for="controlButton in controlButtons"
        :key="controlButton.type"
        :button-icon="controlButton.icon"
        :button-text="controlButton.text"
        :button-type="controlButton.type"
        :size-change-percent="2"
        button-padding="10px"
        class="tab-item"
        contentPosition="left"
        text-size="16px"
        @click="emitCategory(controlButton.type)"
    />
  </div>
</template>

<script lang="ts" setup>
import categoryAlbums from "@/assets/icons/category/category-albums.svg"
import categoryArtists from "@/assets/icons/category/category-artists.svg"
import categoryGenres from "@/assets/icons/category/category-genres.svg"
import categorySongs from "@/assets/icons/category/category-songs.svg"
import categoryDirectories from "@/assets/icons/category/category-directories.svg"
import CustomButton from "@/components/base/CustomButton.vue";

const controlButtons = [
  // {text: "Текущее", type: "controlNow", icon: categoryNow},
  // {text: "Недавние", type: "controlLast", icon: categoryLast},
  {text: "Альбомы", type: "controlAlbums", icon: categoryAlbums},
  {text: "Исполнители", type: "controlArtists", icon: categoryArtists},
  {text: "Жанры", type: "controlGenres", icon: categoryGenres},
  // {text: "Плейлисты", type: "controlPlaylist", icon: categoryPlaylists},
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