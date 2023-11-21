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
          v-for="song in songsStore.allSongs"
          :key="song.songId"
          :song-id="song.songId"
          :audio-file-id="song.audioFileId"
          :row-text="calcRowText(song)"
      >

      </SongRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import SongRow from "@/components/panels/songs/SongRow.vue";
import type {SongGetAllItem} from "@/services/SongService";
import {onMounted} from "vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomHeader from "@/components/base/CustomHeader.vue";
import {useArtistsStore} from "@/stores/useArtistsStore";

const songsStore = useSongsStore()
const artistStore = useArtistsStore()

onMounted(async () => {
  await songsStore.fetchSongs()
})

function calcRowText(song: SongGetAllItem): string {
  let text = "";
  if (song.songNumber) {
    if (song.discNumber) {
      text += song.discNumber + "-"
    }
    text += song.songNumber + ". "
  }
  if (song.title) {
    text += song.title
  }
  if (song.artistId) {
    if (!artistStore.artistByArtistId.has(song.artistId)) {
      artistStore.fetchAllArtists(song.artistId)
    }
    const artist = artistStore.artistByArtistId.get(song.artistId);
    if (artist) {
      text += " - " + artist.name;
    }
  }
  return text
}
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