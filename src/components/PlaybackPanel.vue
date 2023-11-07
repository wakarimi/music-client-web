<template>
  <div class="tab-list">
    <PlaybackRow button-text="Sunset Horizons" class="tab-item">
      <template #image>
        <img :src=cover alt="Текущее">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="Beautiful Days" class="tab-item">
      <template #image>
        <img :src=coverAce alt="Последние">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="A Cruel Angel’s Thesis" class="tab-item">
      <template #image>
        <img :src=coverEva alt="Альбомы">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="Megadeth - Symphony Of Destruction" class="tab-item">
      <template #image>
        <img :src=coverFlat alt="Исполнители">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="Юность в сапогах (♂️Right Version♂️)" class="tab-item">
      <template #image>
        <img :src=coverGachi alt="Жанры">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="Get Low" class="tab-item">
      <template #image>
        <img :src=coverUnd alt="Дорожки">
      </template>
    </PlaybackRow>
    <PlaybackRow button-text="Прядение текущего времени" class="tab-item">
      <template #image>
        <img :src=coverZhang alt="Файлы">
      </template>
    </PlaybackRow>
  </div>
</template>

<script setup lang="ts">
import cover from "@/assets/cover.png"
import coverAce from "@/assets/cover-ace.png"
import coverEva from "@/assets/cover-eva.png"
import coverFlat from "@/assets/cover-flat.jpg"
import coverGachi from "@/assets/cover-gachi.png"
import coverUnd from "@/assets/cover-und.png"
import coverZhang from "@/assets/cover-zhang.png"
import PlaybackRow from "@/components/PlaybackRow.vue";
</script>

<style scoped>
.tab-item {
  margin-bottom: 1vh;
}
</style>