<template>
  <div class="playback" ref="playbackContainer">

    <div class="cover-and-info">
      <div class="album-cover">
        <img :src="coverImage" alt="Обложка">
      </div>
      <div class="track-info" :style="{ fontSize: computedFontSize + 'px' }">
        <h2>Ultraviolet Stream</h2>
        <h4>Bobstor</h4>
      </div>
    </div>

    <div class="control-panel-background">
      <div class="playback-control-panel">
        <button @click="togglePlay">
          <img :src="isPlaying ? pauseIcon : playIcon" :alt="isPlaying ? 'Play' : 'Pause'">
        </button>
        <button @click="nextTrack">
          <img :src="nextIcon" alt="nextTrack">
        </button>

        <span class="current-time">00:00</span>
        <input type="range" class="track-slider" min="0" max="100">
        <span class="total-time">04:20</span>
        <input type="range" class="volume-slider" min="0" max="100">
        <button @click="togglePlaybackMode">
          <img :src="replayIcon" alt="togglePlaybackMode">
        </button>
        <button class="btn-toggle-control-panel" @click="toggleControlPanel">
          <img :src="toggleControlIcon" alt="toggleControlPanel" :class="{ 'rotated': isVisible }">
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import playIcon from "@/assets/play-icon.svg";
import pauseIcon from "@/assets/pause-icon.svg";
import nextIcon from "@/assets/next-icon.svg";
import replayIcon from "@/assets/replay-icon.svg";
import toggleControlIcon from "@/assets/toggle-control-icon.svg";
import coverImage from "@/assets/cover.png";

const isPlaying = ref(false);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const nextTrack = () => {

};

const togglePlaybackMode = () => {

};

defineProps({
  isVisible: Boolean
});

const emit = defineEmits(['toggleVisibility']);
const toggleControlPanel = () => {
  // Эмитируем событие, когда функция вызывается
  emit('toggleVisibility');
};

const computedFontSize = ref<number>(16);
const playbackContainer = ref<HTMLElement | null>(null);

const calculateFontSize = () => {
  if (playbackContainer.value) {
    const containerHeight = playbackContainer.value.clientHeight;
    const scaleFactor = 20; // Масштабный коэффициент
    computedFontSize.value = containerHeight / scaleFactor;
  }
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  playbackContainer.value = document.querySelector('.playback');
  if (playbackContainer.value) {
    calculateFontSize();
    resizeObserver = new ResizeObserver(calculateFontSize);
    resizeObserver.observe(playbackContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver && playbackContainer.value) {
    resizeObserver.unobserve(playbackContainer.value);
  }
});
</script>

<style scoped>

.playback {
  color: aliceblue;
  background-color: #412e45;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
}

.cover-and-info {
  display: flex;
  justify-content: space-between;
  height: 96%; /* Высота родительского элемента должна быть определена */
}

.album-cover {
  width: 50%;
  height: 60%;
  margin-right: auto; /* Отодвигаем вправо */
  display: flex;
  justify-content: flex-end; /* Выравниваем изображение по правому краю своей половины */
  align-items: center;
  align-self: center; /* Центрируем блок по вертикали */
}

.album-cover img {
  border-radius: 1vh;
  max-width: 100%; /* Изображение займет всю ширину блока .album-cover */
  max-height: 100%; /* Теперь высота изображения будет ограничена высотой .album-cover */
  height: auto; /* Высота будет масштабироваться автоматически */
  object-fit: contain; /* Изображение сохранит свои пропорции */
}

.track-info {
  width: 50%;
  margin-left: auto; /* Отодвигаем влево */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем содержимое по вертикали */
  padding-left: 2ex; /* Отступ слева, чтобы текст не прилипал к краю */
}

h2, h4 {
  margin: 0; /* Убрать стандартные отступы для заголовков */
  padding: 0; /* Убрать стандартные отступы для заголовков */
}

.control-panel-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4vh; /* Высоту можно подстроить под ваш дизайн */
  background-color: rgba(0, 0, 0, 0.2); /* Полупрозрачный черный фон */
}

.playback-control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  align-self: stretch; /* Растянуть на всю ширину родителя */
  margin-top: auto; /* Прижать к низу */
}

.track-slider {
  flex-grow: 1; /* Позволяет ползунку растянуться на доступное пространство */
}

.volume-slider {
  width: 100px; /* Задаем фиксированную ширину для ползунка громкости */
}

.current-time,
.total-time {
  white-space: nowrap; /* Не даем тексту переноситься на следующую строку */
}

.playback-control-panel button {
  background: none; /* Убрать фон кнопки */
  border: none; /* Убрать границы кнопки */
  padding: 0; /* Убрать внутренние отступы */
  margin: 0;
  cursor: pointer; /* Изменить курсор на указатель */
  height: 100%; /* Растягиваем кнопку на всю высоту контейнера */
  aspect-ratio: 1; /* Соотношение ширины к высоте кнопки, 1 означает квадрат */
}

/* Так как кнопка теперь может быть больше по размеру, изображению внутри необходимо указать максимальные размеры */
.playback-control-panel button img {
  display: block;
  padding: 0; /* Убрать внутренние отступы */
  margin: 0;
  max-width: 100%; /* Изображение будет занимать максимум 100% ширины кнопки */
  max-height: 100%; /* Изображение будет занимать максимум 100% высоты кнопки */
  object-fit: contain; /* Убедитесь, что изображение сохраняет свои пропорции */
  transition: transform 0.5s ease; /* Теперь анимация будет применяться и при добавлении и при удалении класса .rotated */
}

.rotated {
  transform: rotate(-180deg);
  transition: transform 0.5s ease;
}

</style>