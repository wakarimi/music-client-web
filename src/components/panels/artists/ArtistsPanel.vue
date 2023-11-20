<template>
  <div class="artists-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Исполнители
      </template>
    </CustomHeader>

    <div class="artist-grid">
      <CustomCard
          class="grid-item"
          v-for="artist in toRaw(artistStore.allArtists.artists)"
          content-type="artist"
          :key="artist.artistId"
          :button-text="artist.name"
          :card-text="artist.name"
          :content-id="artist.artistId"
      >
      </CustomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useArtistsStore} from "@/stores/useArtistsStore";
import {nextTick, onMounted, toRaw} from "vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";

const artistStore = useArtistsStore()

onMounted(async () => {
  await nextTick();
  if (artistStore.allArtists.artists.length === 0) {
    await artistStore.fetchAllArtists()
  }
})
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}

.artists-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.artist-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: start;
  grid-gap: 2vh;
  padding: 10px;
}
</style>