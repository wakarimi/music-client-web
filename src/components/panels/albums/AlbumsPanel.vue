<template>
  <div class="albums-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Альбомы
      </template>
    </CustomHeader>

    <div class="album-grid">
      <CustomCard
          class="grid-item"
          v-for="album in toRaw(albumStore.allAlbums.albums)"
          content-type="album"
          :key="album.albumId"
          :button-text="album.title"
          :card-text="album.title"
          :content-id="album.albumId"
      >
      </CustomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAlbumsStore} from "@/stores/useAlbumsStore";
import {nextTick, onMounted, toRaw} from "vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";

const albumStore = useAlbumsStore()

onMounted(async () => {
  await nextTick();
  if (albumStore.allAlbums.albums.length === 0) {
    await albumStore.fetchAllAlbums()
  }
})
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}

.albums-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.album-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: start;
  grid-gap: 2vh;
  padding: 10px;

  overflow-x: hidden;
}
</style>