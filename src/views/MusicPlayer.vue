<template>
  <div class="player">
    <MusicPlayback
        class="music-playback"
        @toggleVisibility="toggleMusicControlVisibility"
        :isVisible="isMusicControlVisible"
        :style="{height: musicPlaybackHeight}"
    />

    <MusicControl
        class="music-control"
        :style="{height: musicControlHeight, opacity: musicControlOpacity}"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MusicPlayback from "@/components/MusicPlayback.vue";
import MusicControl from "@/components/MusicControl.vue";

const isMusicControlVisible = ref(true)
const musicPlaybackHeight = ref("30%")
const musicControlHeight = ref("70%")
const musicControlOpacity = ref("100%")

const toggleMusicControlVisibility = () => {
  isMusicControlVisible.value = !isMusicControlVisible.value;
  if (isMusicControlVisible.value) {
    musicPlaybackHeight.value = "30%"
    musicControlHeight.value = "70%"
    musicControlOpacity.value = "100%"
  } else {
    musicPlaybackHeight.value = "100%"
    musicControlHeight.value = "0%"
    musicControlOpacity.value = "0%"
  }
}
</script>

<style scoped>
.player {
  display: flex;
  flex-direction: column;
  width: 100vw; /* Занимает всю ширину вьюпорта */
  max-width: 100%; /* Предотвращает выход за пределы вьюпорта */
  height: 100vh; /* Точная высота вьюпорта */
  box-sizing: border-box; /* Учитывает padding и border в общей ширине элемента */
  position: relative;
  overflow: hidden; /* Предотвратит прокрутку если дочерние элементы выйдут за пределы */
  padding: 0; /* Убедитесь, что внешние отступы не влияют на высоту */
  margin: 0; /* Убедитесь, что внешние отступы не влияют на высоту */
}

.music-playback, .music-control {
  /* Анимируем изменения высоты и прозрачности в течение 0.5 секунды */
  transition: height 0.3s ease, opacity 0.15s ease;
}

.music-playback {
  z-index: 1; /* Убедитесь, что music-playback всегда сверху, когда активен */
}

.music-control {
  z-index: 0; /* MusicControl должен быть над MusicPlayback */
}

* {
}

</style>
