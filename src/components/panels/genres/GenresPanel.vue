<template>
  <div class="genres-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            :button-icon="genreCategoryIcon"
            :size-change-percent="5"
            button-padding="6px"
            button-text="Жанры"
            class="header-element"
            text-size="15px"
            @click="handleGenresClick"
        />
        <span
            v-if="currentGenreId"
            class="separator"
        >
          /
        </span>
        <CustomButton
            v-if="currentGenreId"
            :button-icon="getGenreCover(currentGenreId)"
            :button-text="getGenreName(currentGenreId)"
            :size-change-percent="5"
            button-icon-border-radius="4px"
            button-padding="4px"
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
            @click="handleAddAllGenresClick"
        />
        <CustomButton
            :button-icon="playIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handlePlayAllGenresClick"
        />
      </template>
    </CustomHeader>

    <div
        v-if="currentGenreId == null"
        class="genre-grid"
    >
      <CustomCard
          v-for="genre in filteredGenres"
          :key="genre.genreId"
          :card-text="genre.name"
          :content-id="genre.genreId"
          class="grid-item"
          content-type="genre"
          @addClick="handleAddClick"
          @cardClick="handleCardClick"
          @playClick="handlePlayClick"
      />
    </div>

    <div
        v-if="currentGenreId != null"
        class="genre-track-list"
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
import {useGenresStore} from "@/stores/useGenresStore";
import {computed, nextTick, onMounted, ref, toRaw} from "vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import genreCategoryIcon from "@/assets/icons/category/category-genres.svg"
import defaultCover from "@/assets/default/cover.svg"
import {useCoversStore} from "@/stores/useCoversStore";
import CustomSongRow from "@/components/base/CustomSongRow.vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomTextField from "@/components/base/CustomTextField.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";

const genreStore = useGenresStore()
const coverStore = useCoversStore()
const songStore = useSongsStore()

const currentGenreId = ref<number | null>(null);
const filterText = ref<string>("")

onMounted(async () => {
  await nextTick();
  currentGenreId.value = null;
  if (genreStore.getAllGenres == null) {
    await genreStore.fetchGenres();
  }
})

function getGenreCover(genreId: number): string {
  if (!coverStore.getCoverIdsByGenreId(genreId)) {
    coverStore.fetchGenreCovers(genreId);
  }
  const coverIds = coverStore.getCoverIdsByGenreId(genreId);
  if (coverIds) {
    if (coverIds.length > 0) {
      return coverStore.getCoverByCoverId(coverIds[0])
    } else {
      return defaultCover
    }
  } else {
    return defaultCover
  }
}

function getGenreName(genreId: number): string {
  if (!genreStore.getGenreById(genreId)) {
    genreStore.fetchGenres();
  }
  const genre = genreStore.getGenreById(genreId);
  return genre ? genre.name : "Неизвестный альбом";
}

function handleGenresClick() {
  filterText.value = ""
  currentGenreId.value = null;
}

function handleCardClick(contentType: string, contentId: number) {
  filterText.value = ""
  if (!songStore.getSongsByGenreId(contentId)) {
    songStore.fetchGenre(contentId)
  }
  currentGenreId.value = contentId;
}

const filteredGenres = computed(() => {
  if (!filterText.value) {
    return toRaw(genreStore.getAllGenres);
  }
  if (genreStore.getAllGenres) {
    return toRaw(genreStore.getAllGenres).filter(genre =>
        genre.name.toLowerCase().includes(filterText.value.toLowerCase())
    );
  } else {
    return [];
  }
});

const filteredSongs = computed(() => {
  if (!filterText.value) {
    if (currentGenreId.value) {
      return songStore.getSongsByGenreId(currentGenreId.value);
    } else {
      return []
    }
  }
  if (currentGenreId.value) {
    const songs = songStore.getSongsByGenreId(currentGenreId.value)
    if (songs) {
      return toRaw(songs).filter(song => {
        return song.title.toLowerCase().includes(filterText.value.toLowerCase())
      })
    } else {
      return []
    }
  } else {
    return []
  }
});

async function getSongIds(genreId: number): Promise<number[]> {
  if (!songStore.getSongsByGenreId(genreId)) {
    await songStore.fetchGenre(genreId);
  }
  if (songStore.getSongsByGenreId(genreId)) {
    const songs = songStore.getSongsByGenreId(genreId)
    if (songs) {
      return songs.map(song => {
        return song.songId
      })
    } else {
      return []
    }
  } else {
    return [];
  }
}

const emit = defineEmits([
  'info-click',
  'add-click',
  'play-click',
]);

function handleInfoClick(songId: number) {
  emit('info-click', songId);
}

async function handleAddAllGenresClick() {
  const songIds: number[] = []

  if (currentGenreId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const genres = filteredGenres.value
    if (genres) {
      for (const genre of genres) {
        const genresSongIds = await getSongIds(genre.genreId)
        genresSongIds.forEach(songId => {
          songIds.push(songId)
        })
      }
    }
  }
  emit('add-click', songIds);
}

async function handlePlayAllGenresClick() {
  const songIds: number[] = []

  if (currentGenreId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const genres = filteredGenres.value
    if (genres) {
      for (const genre of genres) {
        const genresSongIds = await getSongIds(genre.genreId)
        genresSongIds.forEach(songId => {
          songIds.push(songId)
        })
      }
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
.genres-panel {
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

.genre-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 2vh;
  padding: 10px;

  overflow-x: hidden;
}

.genre-track-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  overflow-x: hidden;
}

.track-list-item {
  height: 40px;
  margin-bottom: 6px;
}
</style>