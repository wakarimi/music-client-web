<template>
  <div class="genres-panel">
    <BaseHeader
        titleText="Жанры"
    >
    </BaseHeader>

    <div class="genre-grid">
      <CustomCard
          class="grid-item"
          v-for="genre in toRaw(genreStore.allGenres.genres)"
          content-type="genre"
          :key="genre.genreId"
          :button-text="genre.name"
          :card-text="genre.name"
          :content-id="genre.genreId"
      >
      </CustomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useGenresStore} from "@/stores/useGenresStore";
import {nextTick, onMounted, toRaw} from "vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import CustomCard from "@/components/base/CustomCard.vue";

const genreStore = useGenresStore()

onMounted(async () => {
  await nextTick();
  if (genreStore.allGenres.genres.length === 0) {
    await genreStore.fetchAllGenres()
  }
  console.log(genreStore.allGenres)
})
</script>

<style scoped>
.genres-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.genre-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: start;
  grid-gap: 2vh;
  padding: 10px;
}
</style>