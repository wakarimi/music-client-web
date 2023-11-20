<template>
  <div class="songs-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Дорожки
      </template>
    </CustomHeader>

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
import SongRow from "@/components/panels/songs/SongRow.vue";
import type {SongGetAllItem} from "@/services/SongService";
import {onMounted, ref} from "vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomHeader from "@/components/base/CustomHeader.vue";

const songsStore = useSongsStore()

let songs = ref<SongGetAllItem[]>([])

onMounted(async () => {
  await songsStore.fetchSongs()
  songs.value = songsStore.songs
})

</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}

.songs-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.song-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.song-row {
  height: 40px;
  margin-bottom: 6px;
}
</style>