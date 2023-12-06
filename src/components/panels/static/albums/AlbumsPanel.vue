<template>
  <div class="albums-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            :button-icon="albumCategoryIcon"
            :size-change-percent="5"
            button-padding="6px"
            button-text="Альбомы"
            class="header-element"
            text-size="15px"
            @click="handleAlbumsClick"
        />
        <span
            v-if="currentAlbumId"
            class="separator"
        >
          /
        </span>
        <CustomButton
            v-if="currentAlbumId"
            :button-icon="getAlbumCover(currentAlbumId)"
            :button-text="getAlbumName(currentAlbumId)"
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
            @click="handleAddAllAlbumsClick"
        />
        <CustomButton
            :button-icon="playIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handlePlayAllAlbumsClick"
        />
      </template>
    </CustomHeader>

    <div
        v-if="currentAlbumId == null"
        class="album-grid"
    >
      <CustomCard
          v-for="album in filteredAlbums"
          :key="album.albumId"
          :card-text="album.title"
          :content-id="album.albumId"
          class="grid-item"
          content-type="album"
          @addClick="handleAddClick"
          @cardClick="handleCardClick"
          @playClick="handlePlayClick"
      />
    </div>

    <div
        v-if="currentAlbumId != null"
        class="album-track-list"
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
import {useAlbumsStore} from "@/stores/useAlbumsStore";
import {computed, nextTick, onMounted, ref, toRaw} from "vue";
import CustomCard from "@/components/base-backup/CustomCard.vue";
import CustomHeader from "@/components/base-backup/CustomHeader.vue";
import CustomButton from "@/components/base-backup/CustomButton.vue";
import albumCategoryIcon from "@/assets/icons/category/category-albums.svg"
import defaultCover from "@/assets/default/cover.svg"
import {useCoversStore} from "@/stores/useCoversStore";
import CustomSongRow from "@/components/base-backup/CustomSongRow.vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomTextField from "@/components/base-backup/CustomTextField.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";

const albumStore = useAlbumsStore()
const coverStore = useCoversStore()
const songStore = useSongsStore()

const currentAlbumId = ref<number | null>(null);
const filterText = ref<string>("")

onMounted(async () => {
  await nextTick();
  currentAlbumId.value = null;
  if (albumStore.getAllAlbums == null) {
    await albumStore.fetchAlbums();
  }
})

function getAlbumCover(albumId: number): string {
  if (!coverStore.getCoverIdsByAlbumId(albumId)) {
    coverStore.fetchAlbumCovers(albumId);
  }
  const coverIds = coverStore.getCoverIdsByAlbumId(albumId);
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

function getAlbumName(albumId: number): string {
  if (!albumStore.getAlbumById(albumId)) {
    albumStore.fetchAlbums();
  }
  const album = albumStore.getAlbumById(albumId);
  return album ? album.title : "Неизвестный альбом";
}

function handleAlbumsClick() {
  filterText.value = ""
  currentAlbumId.value = null;
}

function handleCardClick(contentType: string, contentId: number) {
  filterText.value = ""
  if (!songStore.getSongsByAlbumId(contentId)) {
    songStore.fetchAlbum(contentId)
  }
  currentAlbumId.value = contentId;
}

const filteredAlbums = computed(() => {
  if (!filterText.value) {
    return toRaw(albumStore.getAllAlbums);
  }
  if (albumStore.getAllAlbums) {
    return toRaw(albumStore.getAllAlbums).filter(album =>
        album.title.toLowerCase().includes(filterText.value.toLowerCase())
    );
  } else {
    return [];
  }
});

const filteredSongs = computed(() => {
  if (!filterText.value) {
    if (currentAlbumId.value) {
      return songStore.getSongsByAlbumId(currentAlbumId.value);
    } else {
      return []
    }
  }
  if (currentAlbumId.value) {
    const songs = songStore.getSongsByAlbumId(currentAlbumId.value)
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

async function getSongIds(albumId: number): Promise<number[]> {
  if (!songStore.getSongsByAlbumId(albumId)) {
    await songStore.fetchAlbum(albumId);
  }
  if (songStore.getSongsByAlbumId(albumId)) {
    const songs = songStore.getSongsByAlbumId(albumId)
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

async function handleAddAllAlbumsClick() {
  const songIds: number[] = []

  if (currentAlbumId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const albums = filteredAlbums.value
    if (albums) {
      for (const album of albums) {
        const albumsSongIds = await getSongIds(album.albumId)
        albumsSongIds.forEach(songId => {
          songIds.push(songId)
        })
      }
    }
  }
  emit('add-click', songIds);
}

async function handlePlayAllAlbumsClick() {
  const songIds: number[] = []

  if (currentAlbumId.value) {
    const songs = filteredSongs.value
    if (songs) {
      for (const song of songs) {
        songIds.push(song.songId)
      }
    }
  } else {
    const albums = filteredAlbums.value
    if (albums) {
      for (const album of albums) {
        const albumsSongIds = await getSongIds(album.albumId)
        albumsSongIds.forEach(songId => {
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
.albums-panel {
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

.album-grid {
  flex-grow: 1;
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 2vh;
  padding: 10px;

  overflow-x: hidden;
}

.album-track-list {
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