<template>
  <div class="grid">
    <ArtistItem button-text="Love, Money, Rock'n'roll" class="tab-item">
      <template #image>
        <img :src=cover alt="Текущее">
      </template>
    </ArtistItem>
    <ArtistItem button-text="Ace Attorney" class="tab-item">
      <template #image>
        <img :src=coverAce alt="Последние">
      </template>
    </ArtistItem>
    <AlbumItem button-text="Гачи" class="tab-item">
      <template #image>
        <img :src=coverGachi alt="Жанры">
      </template>
    </AlbumItem>
    <ArtistItem button-text="Underground 2" class="tab-item">
      <template #image>
        <img :src=coverUnd alt="Дорожки">
      </template>
    </ArtistItem>
    <ArtistItem button-text="Lay a beauty to rest" class="tab-item">
      <template #image>
        <img :src=coverZhang alt="Файлы">
      </template>
    </ArtistItem>
  </div>
</template>

<script setup lang="ts">
import AlbumItem from "@/components/AlbumItem.vue";
import cover from "@/assets/cover.png"
import coverAce from "@/assets/cover-ace.png"
import coverGachi from "@/assets/cover-gachi.png"
import coverUnd from "@/assets/cover-und.png"
import coverZhang from "@/assets/cover-zhang.png"
import ArtistItem from "@/components/ArtistItem.vue";
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16%, 1fr)); /* Сетка с авто-заполнением и минимальной шириной для кнопок */
  grid-gap: 2vh; /* Отступы между кнопками в сетке */
}
</style>