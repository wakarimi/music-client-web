<template>
  <div class="grid">
    <AlbumItem button-text="Love, Money, Rock'n'roll" class="tab-item">
      <template #image>
        <img :src=cover alt="Текущее">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Ace Attorney" class="tab-item">
      <template #image>
        <img :src=coverAce alt="Последние">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Evangelion" class="tab-item">
      <template #image>
        <img :src=coverEva alt="Альбомы">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Flatout 2" class="tab-item">
      <template #image>
        <img :src=coverFlat alt="Исполнители">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Гачи" class="tab-item">
      <template #image>
        <img :src=coverGachi alt="Жанры">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Underground 2" class="tab-item">
      <template #image>
        <img :src=coverUnd alt="Дорожки">
      </template>
    </AlbumItem>
    <AlbumItem button-text="Lay a beauty to rest" class="tab-item">
      <template #image>
        <img :src=coverZhang alt="Файлы">
      </template>
    </AlbumItem>
  </div>
</template>

<script setup lang="ts">
import AlbumItem from "@/components/AlbumItem.vue";
import cover from "@/assets/cover.png"
import coverAce from "@/assets/cover-ace.png"
import coverEva from "@/assets/cover-eva.png"
import coverFlat from "@/assets/cover-flat.jpg"
import coverGachi from "@/assets/cover-gachi.png"
import coverUnd from "@/assets/cover-und.png"
import coverZhang from "@/assets/cover-zhang.png"
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16%, 1fr)); /* Сетка с авто-заполнением и минимальной шириной для кнопок */
  grid-gap: 2vh; /* Отступы между кнопками в сетке */
}
</style>