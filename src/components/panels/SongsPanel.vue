<template>
  <div class="songs-panel">
    <BaseHeader
        titleText="Дорожки"
    >

    </BaseHeader>
    <div class="song-list">
      <SongRow
          class="song-row"
          v-for="song in songs"
          :key="song.songId"
          :song-id="song.songId"
          :audio-file-id="song.audioFileId"
          :row-text="song.title"
      >

      </SongRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/base/BaseHeader.vue";
import SongRow from "@/components/panels/songs/SongRow.vue";
import type {SongGetAllItem} from "@/services/SongService";
import {onMounted, ref} from "vue";
import {useSongStore} from "@/stores/useSongStore";

const songStore = useSongStore()

let songs = ref<SongGetAllItem[]>([])

onMounted(async () => {
  await songStore.fetchSongs()
  songs.value = songStore.songs
})

</script>

<style scoped>
.songs-panel {
  display: flex; /* использование Flexbox */
  flex-direction: column; /* упорядочивание дочерних элементов в колонку */
  height: 100%; /* высота в 100% от родительского элемента */
}

.song-list {
  flex-grow: 1; /* элемент займет все доступное пространство */
  overflow-y: auto; /* добавление вертикальной прокрутки при необходимости */
  padding: 10px;
}

.song-row {
  height: 40px;
  margin-bottom: 6px;
}
</style>