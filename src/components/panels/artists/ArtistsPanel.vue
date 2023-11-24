<template>
  <div class="artists-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            :button-icon="artistCategoryIcon"
            :size-change-percent="5"
            button-padding="6px"
            button-text="Исполнители"
            class="header-element"
            text-size="15px"
            @click="handleArtistsClick"
        />
        <span
            v-if="currentArtistId"
            class="separator"
        >
          /
        </span>
        <CustomButton
            v-if="currentArtistId"
            :button-icon="getArtistCover(currentArtistId)"
            :button-text="getArtistName(currentArtistId)"
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
            @click="handleAddAllArtistsClick"
        />
        <CustomButton
            :button-icon="playIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handlePlayAllArtistsClick"
        />
      </template>
    </CustomHeader>

    <div
        v-if="currentArtistId == null"
        class="artist-grid"
    >
      <CustomCard
          v-for="artist in filteredArtists"
          :key="artist.artistId"
          :card-text="artist.name"
          :content-id="artist.artistId"
          class="grid-item"
          content-type="artist"
          @addClick="handleAddClick"
          @cardClick="handleCardClick"
          @playClick="handlePlayClick"
      />
    </div>

    <div
        v-if="currentArtistId != null"
        class="artist-track-list"
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
import {useArtistsStore} from "@/stores/useArtistsStore";
import {computed, nextTick, onMounted, ref, toRaw} from "vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import artistCategoryIcon from "@/assets/icons/category/category-artists.svg"
import defaultCover from "@/assets/default/cover.svg"
import {useCoversStore} from "@/stores/useCoversStore";
import CustomSongRow from "@/components/base/CustomSongRow.vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomTextField from "@/components/base/CustomTextField.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";

const artistStore = useArtistsStore()
const coverStore = useCoversStore()
const songStore = useSongsStore()

const currentArtistId = ref<number | null>(null);
const filterText = ref<string>("")

onMounted(async () => {
  await nextTick();
  currentArtistId.value = null;
  if (artistStore.getAllArtists == null) {
    await artistStore.fetchArtists();
  }
})

function getArtistCover(artistId: number): string {
  if (!coverStore.getCoverIdsByArtistId(artistId)) {
    coverStore.fetchArtistCovers(artistId);
  }
  const coverIds = coverStore.getCoverIdsByArtistId(artistId);
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

function getArtistName(artistId: number): string {
  if (!artistStore.getArtistById(artistId)) {
    artistStore.fetchArtists();
  }
  const artist = artistStore.getArtistById(artistId);
  return artist ? artist.name : "Неизвестный альбом";
}

function handleArtistsClick() {
  filterText.value = ""
  currentArtistId.value = null;
}

function handleCardClick(contentType: string, contentId: number) {
  filterText.value = ""
  if (!songStore.getSongsByArtistId(contentId)) {
    songStore.fetchArtist(contentId)
  }
  currentArtistId.value = contentId;
}

const filteredArtists = computed(() => {
  if (!filterText.value) {
    return toRaw(artistStore.getAllArtists);
  }
  if (artistStore.getAllArtists) {
    return toRaw(artistStore.getAllArtists).filter(artist =>
        artist.name.toLowerCase().includes(filterText.value.toLowerCase())
    );
  } else {
    return [];
  }
});

const filteredSongs = computed(() => {
  if (!filterText.value) {
    if (currentArtistId.value) {
      return songStore.getSongsByArtistId(currentArtistId.value);
    } else {
      return []
    }
  }
  if (currentArtistId.value) {
    const songs = songStore.getSongsByArtistId(currentArtistId.value)
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

async function getSongIds(artistId: number): Promise<number[]> {
  if (!songStore.getSongsByArtistId(artistId)) {
    await songStore.fetchArtist(artistId);
  }
  if (songStore.getSongsByArtistId(artistId)) {
    const songs = songStore.getSongsByArtistId(artistId)
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

async function handleAddAllArtistsClick() {
  const songIds: number[] = []

  if (currentArtistId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const artists = filteredArtists.value
    if (artists) {
      for (const artist of artists) {
        const artistsSongIds = await getSongIds(artist.artistId)
        artistsSongIds.forEach(songId => {
          songIds.push(songId)
        })
      }
    }
  }
  emit('add-click', songIds);
}

async function handlePlayAllArtistsClick() {
  const songIds: number[] = []

  if (currentArtistId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const artists = filteredArtists.value
    if (artists) {
      for (const artist of artists) {
        const artistsSongIds = await getSongIds(artist.artistId)
        artistsSongIds.forEach(songId => {
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
.artists-panel {
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

.artist-grid {
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

.artist-track-list {
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