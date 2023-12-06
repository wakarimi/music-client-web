<template>
  <div class="songs-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            :button-icon="songCategoryIcon"
            :size-change-percent="5"
            button-padding="6px"
            button-text="Дорожки"
            class="header-element"
            text-size="15px"
        />
      </template>

      <template #right>
        <CustomTextField
            v-model="filterText"
            class="filter-field header-element"
            placeholder-text="Фильтр"
            text-size="14px"
        />
        <CustomButton
            :button-icon="addIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handleAddAllSongsClick"
        />
        <CustomButton
            :button-icon="playIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handlePlayAllSongsClick"
        />
      </template>
    </CustomHeader>

    <div
        class="track-list"
    >
      <CustomSongRow
          v-for="song in filteredSongs"
          :key="song.songId"
          :song-id="song.songId"
          class="track-list-item"
          @addClick="handleAddClick"
          @infoClick="handleInfoClick"
          @playClick="handlePlayClick"
      >
      </CustomSongRow>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, toRaw} from "vue";
import CustomHeader from "@/components/base-backup/CustomHeader.vue";
import CustomButton from "@/components/base-backup/CustomButton.vue";
import songCategoryIcon from "@/assets/icons/category/category-songs.svg"
import CustomSongRow from "@/components/base-backup/CustomSongRow.vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomTextField from "@/components/base-backup/CustomTextField.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";

const songStore = useSongsStore()

const filterText = ref<string>("")

onMounted(async () => {
  await nextTick();
  if (songStore.getAllSongs() === null) {
    await songStore.fetchAllSongs();
  }
})

const filteredSongs = computed(() => {
  const songs = songStore.getAllSongs()
  if (!filterText.value) {
    if (songs) {
      return songs
    } else {
      return []
    }
  } else {
    if (songs) {
      return toRaw(songs).filter(song => {
        return song.title.toLowerCase().includes(filterText.value.toLowerCase())
      })
    } else {
      return []
    }
  }
});

const emit = defineEmits([
  'info-click',
  'add-click',
  'play-click',
]);

function handleInfoClick(songId: number) {
  emit('info-click', songId);
}

async function handleAddAllSongsClick() {
  const songIds: number[] = []
  const songs = filteredSongs.value
  if (songs) {
    for (const song of songs) {
      songIds.push(song.songId)
    }
  }
  emit('add-click', songIds);
}

async function handlePlayAllSongsClick() {
  const songIds: number[] = []
  const songs = filteredSongs.value
  if (songs) {
    for (const song of songs) {
      songIds.push(song.songId)
    }
  }
  emit('play-click', songIds);
}

function handleAddClick(songIds: number[]) {
  emit('add-click', songIds);
}

function handlePlayClick(songIds: number[]) {
  emit('play-click', songIds);
}
</script>

<style scoped>
.songs-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  flex-shrink: 0;
  height: 30px;
}

.header-element {
  height: 30px;
}

.control-button {
  width: 30px;
}

.filter-field {
  width: 200px;
}

.track-list {
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px;
  overflow-x: hidden;
}

.track-list-item {
  height: 40px;
  margin-bottom: 6px;
}
</style>