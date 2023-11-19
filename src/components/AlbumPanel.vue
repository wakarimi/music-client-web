<template>
  <div class="grid">
    <AlbumItem
      v-for="album in toRaw(albumStore.allAlbums)"
      :key="album.albumId"
      :button-text="album.title"
      class="tab-item"
    >
      <template #image>
        <img :src="getCover(album)" :alt="album.title" />
      </template>
    </AlbumItem>
  </div>
</template>

<script setup lang="ts">
import AlbumItem from '@/components/AlbumItem.vue'
import cover from '@/assets/cover.png'
import { onMounted, toRaw } from 'vue'
import { useAlbumsStore } from '@/stores/useAlbumsStore'
import type { AlbumGetAll } from '@/services/AlbumService'

const albumStore = useAlbumsStore()

onMounted(async () => {
  await albumStore.fetchAllAlbums()
})

const getCover = (album: AlbumGetAll): string => {
  if (album.bestCovers == null || album.bestCovers?.length == 0) {
    return cover
  } else {
    return 'http://localhost:8022/api/covers/' + album.bestCovers[0] + '/image'
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20vh, 1fr));
  grid-gap: 2vh;
}
</style>

