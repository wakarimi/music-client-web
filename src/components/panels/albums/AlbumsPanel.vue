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
            :button-text="getAlbumName(currentAlbumId)"
            text-size="16px"
            :size-change-percent="5"
        />
      </template>
    </CustomHeader>

    <div class="album-grid">
      <CustomCard
          class="grid-item"
          v-for="album in toRaw(albumStore.getAllAlbums)"
          :key="album.albumId"
          content-type="album"
          :content-id="album.albumId"
          :card-text="album.title"
          @cardClick="handleCardClick"
      >
      </CustomCard>
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

const albumStore = useAlbumsStore()

const currentAlbumId = ref<number | null>(null);

onMounted(async () => {
  await nextTick();
  currentAlbumId.value = null;
  if (albumStore.getAllAlbums == null) {
    await albumStore.fetchAlbums();
  }
})

function getAlbumCover(albumId: number): string {
  if (!albumStore.getAlbumById(albumId)) {
    albumStore.fetchAlbums();
  }
  const album = albumStore.getAlbumById(albumId);
  return album ? album.title : "Неизвестный альбом";
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
  currentAlbumId.value = contentId;
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
</style>