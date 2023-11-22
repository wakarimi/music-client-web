<template>
  <div class="albums-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            class="header-element"
            button-padding="6px"
            :button-icon="albumCategoryIcon"
            button-text="Альбомы"
            text-size="16px"
            :size-change-percent="5"
            @click="handleAlbumsClick"
        />
        <span
            class="separator"
            v-if="currentAlbumId"
        >
          /
        </span>
        <CustomButton
            class="header-element"
            v-if="currentAlbumId"
            button-padding="4px"
            :button-icon="getAlbumCover(currentAlbumId)"
            button-icon-border-radius="4px"
            :button-text="getAlbumName(currentAlbumId)"
            text-size="16px"
            :size-change-percent="5"
        />
      </template>

      <template #right>
        <CustomTextField
            class="filter-field header-element"
            placeholder-text="Фильтр"
            v-model="filterText"
            text-size="14px"
        />
        <CustomButton
            class="control-button header-element"
            :button-icon="addIcon"
            button-padding="4px"
            :size-change-percent="2"
            @click="handleAddClick"
        />
        <CustomButton
            class="control-button header-element"
            :button-icon="playIcon"
            button-padding="4px"
            :size-change-percent="2"
            @click="handlePlayClick"
        />
      </template>
    </CustomHeader>

    <div
        class="album-grid"
        v-if="currentAlbumId == null"
    >
      <CustomCard
          class="grid-item"
          v-for="album in filteredAlbums"
          :key="album.albumId"
          content-type="album"
          :content-id="album.albumId"
          :card-text="album.title"
          @cardClick="handleCardClick"
          @addClick="handleAddClick"
          @playClick="handlePlayClick"
      />
    </div>

    <div
        class="album-track-list"
        v-if="currentAlbumId != null"
    >
      <CustomSongRow
          class="track-list-item"
          v-for="song in filteredSongs"
          :key="song.songId"
          :song-id="song.songId"
          @infoClick="handleInfoClick"
          @addClick="handleAddClick"
          @playClick="handlePlayClick"
      >
      </CustomSongRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAlbumsStore} from "@/stores/useAlbumsStore";
import {computed, nextTick, onMounted, ref, toRaw} from "vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import albumCategoryIcon from "@/assets/icons/category/category-albums.svg"
import defaultCover from "@/assets/default/cover.svg"
import {useCoversStore} from "@/stores/useCoversStore";
import CustomSongRow from "@/components/base/CustomSongRow.vue";
import {useSongsStore} from "@/stores/useSongsStore";
import CustomTextField from "@/components/base/CustomTextField.vue";
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

const emit = defineEmits([
  'info-click',
  'add-click',
  'play-click',
]);

function handleInfoClick(contentType: string, contentId: number) {
  emit('info-click', contentType, contentId);
}

function handleAddClick(contentType: string, contentId: number) {
  emit('add-click', contentType, contentId);
}

function handlePlayClick(contentType: string, contentId: number) {
  emit('play-click', contentType, contentId);
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
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start; /* Выравнивание элементов внутри каждой строки */
  align-content: start; /* Выравнивание всех строк в контейнере */
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