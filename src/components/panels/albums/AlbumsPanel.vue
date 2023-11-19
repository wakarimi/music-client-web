<template>
  <div class="albums-panel">
    <BaseHeader
        titleText="Альбомы"
    >
    </BaseHeader>

    <div class="album-grid">
      <CustomCard
          class="grid-item"
          v-for="album in toRaw(albumStore.allAlbums)"
          content-type="album"
          :key="album.albumId"
          :button-text="album.title"
          :card-image="cover"
          :card-text="album.title"
          :content-id="album.albumId"
      >
      </CustomCard>

      <AlbumItem
          class="grid-item"
          v-for="album in toRaw(albumStore.allAlbums)"
          :key="album.albumId"
          :button-text="album.title"
      >
        <template #image>
          <img :src="getCover(album)" :alt="album.title" />
        </template>
      </AlbumItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAlbumsStore} from "@/stores/useAlbumsStore";
import {nextTick, onMounted, toRaw} from "vue";
import cover from '@/assets/default/cover.svg'
import AlbumItem from "@/components/AlbumItem.vue";
import type {AlbumGetAll} from "@/services/AlbumService";
import BaseHeader from "@/components/base/BaseHeader.vue";
import CustomCard from "@/components/base/CustomCard.vue";

const albumStore = useAlbumsStore()

onMounted(async () => {
  await nextTick();
  if (albumStore.allAlbums.length === 0) {
    await albumStore.fetchAllAlbums()
  }
})

const getCover = (album: AlbumGetAll): string => {
  return cover
}
</script>

<style scoped>
.albums-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.album-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20vh, 1fr));
  grid-gap: 2vh;
  padding: 10px;
}
</style>