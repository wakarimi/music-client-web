<template>
  <div class="albums-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
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
            v-if="currentAlbumId"
            button-padding="4px"
            :button-icon="getAlbumCover(currentAlbumId)"
            button-icon-border-radius="4px"
            :button-text="getAlbumName(currentAlbumId)"
            text-size="16px"
            :size-change-percent="5"
        />
      </template>
    </CustomHeader>

    <div
        class="album-grid"
        v-if="currentAlbumId == null"
    >
      <CustomCard
          class="grid-item"
          v-for="album in toRaw(albumStore.getAllAlbums)"
          :key="album.albumId"
          content-type="album"
          :content-id="album.albumId"
          :card-text="album.title"
          @cardClick="handleCardClick"
          @add-click="handleCardAddClick"
          @play-click="handleCardPlayClick"
      >
      </CustomCard>
    </div>

    <div
        class="album-track-list"
        v-if="currentAlbumId != null"
    >
      <CustomSongRow
          class="track-list-item"
          v-for="album in toRaw(albumStore.getAllAlbums)"
          :key="album.albumId"
          :song-id="album.albumId"
      >
      </CustomSongRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAlbumsStore} from "@/stores/useAlbumsStore";
import {nextTick, onMounted, ref, toRaw} from "vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import albumCategoryIcon from "@/assets/icons/category/category-albums.svg"
import defaultCover from "@/assets/default/cover.svg"
import {useCoversStore} from "@/stores/useCoversStore";
import CustomSongRow from "@/components/base/CustomSongRow.vue";

const albumStore = useAlbumsStore()
const coverStore = useCoversStore()

const currentAlbumId = ref<number | null>(null);

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
  currentAlbumId.value = null;
}

function handleCardClick(contentType: string, contentId: number) {
  console.log("handleCardClick " + contentType + " " + contentId)
  currentAlbumId.value = contentId;
}

function handleCardAddClick(contentType: string, contentId: number) {
  console.log("handleAddClick " + contentType + " " + contentId)
}

function handleCardPlayClick(contentType: string, contentId: number) {
  console.log("handlePlayClick " + contentType + " " + contentId)
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

.album-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start;
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