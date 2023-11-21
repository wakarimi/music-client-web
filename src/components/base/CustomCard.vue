<template>
  <div class="custom-card">
    <button
        class="card-button"
        @click="handleCardClick"
    >
      <div
          ref="containerRef"
          class="content"
          :style="[{ height: halfWidth * 2 + 40 + 'px' }]"
      >
        <img
            :class="[getImageClass(covers.length, index), 'card-image']"
            v-for="(cover, index) in covers"
            :key="index"
            :src="cover"
            alt="cover"
        >
        <div
          class="card-text-wrapper"
          :style="[{ top: halfWidth * 2 + 'px' }]"
        >
          <span class="card-text">{{ cardText }}</span>
        </div>
        <div
          class="sub-button-wrapper"
        >
          <CustomButton
              class="card-sub-button"
              :button-icon="addIcon"
              button-padding="4px"
              :size-change-percent="10"
              :should-animate="cardShouldAnimate"
              @click="handleAddClick($event)"
          />
          <CustomButton
              class="card-sub-button"
              :button-icon="playIcon"
              button-padding="4px"
              :size-change-percent="10"
              @click="handlePlayClick($event)"
          />
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import defaultCardImage from "@/assets/default/cover.svg";
import {nextTick} from "vue";
import {useCoversStore} from "@/stores/useCoversStore";
import CustomButton from "@/components/base/CustomButton.vue";
import playIcon from "@/assets/icons/card-sub-button/play.svg"
import addIcon from "@/assets/icons/card-sub-button/add.svg"

const props = defineProps({
  contentType: {
    type: String, // album, artist, genre, playlist, directory, audioFile
    required: true,
  },
  contentId: {
    type: Number,
    required: true,
  },
  cardText: {
    type: String
  },
  sizeChangePercent: {
    type: Number,
    default: 0,
  },
})

const cardShouldAnimate = ref(true)

const emit = defineEmits(['card-click', 'add-click', 'play-click']);

function handleCardClick() {
  emit('card-click', props.contentType, props.contentId);
}

function handleAddClick(event: MouseEvent) {
  event.stopPropagation()
  emit('add-click', props.contentType, props.contentId);
}

function handlePlayClick(event: MouseEvent) {
  event.stopPropagation()
  emit('play-click', props.contentType, props.contentId);
}

let covers = ref<string[]>([]);
const coversStore = useCoversStore();

const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const halfWidth = computed(() => containerWidth.value * 0.5);

const updateContainerWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

let resizeObserver: ResizeObserver | null = null;

function getImageClass(length: number, index: number) {
  if (length === 1) {
    return 'card-image-full';

  } else if (length === 2) {
    if (index === 0) {
      return 'card-image-half-left'
    } else if (index === 1) {
      return 'card-image-half-right'
    }

  } else if (length === 3) {
    if (index === 0) {
      return 'card-image-half-left'
    } else if (index === 1) {
      return 'card-image-quarter-top-right';
    } else if (index === 2) {
      return 'card-image-quarter-bottom-right';
    }

  } else if (length === 4) {
    if (index === 0) {
      return 'card-image-quarter-top-left';
    } else if (index === 1) {
      return 'card-image-quarter-top-right';
    } else if (index === 2) {
      return 'card-image-quarter-bottom-left';
    } else if (index === 3) {
      return 'card-image-quarter-bottom-right';
    }
  }
}

onMounted(async () => {
  await nextTick();

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(containerRef.value);
    updateContainerWidth();
  }

  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }

  let fetchedCovers: number[] = [];
  if (props.contentType === 'album') {
    if (!coversStore.getCoverIdsByAlbumId(props.contentId)) {
      await coversStore.fetchAlbumCovers(props.contentId);
    }
    fetchedCovers = coversStore.getCoverIdsByAlbumId(props.contentId) || [];
  } else if (props.contentType === 'artist') {
    if (!coversStore.getCoverIdsByAlbumId(props.contentId)) {
      await coversStore.fetchArtistCovers(props.contentId);
    }
    fetchedCovers = coversStore.getCoverIdsByAlbumId(props.contentId) || [];
  } else if (props.contentType === 'genre') {
    if (!coversStore.getCoverIdsByAlbumId(props.contentId)) {
      await coversStore.fetchGenreCovers(props.contentId);
    }
    fetchedCovers = coversStore.getCoverIdsByAlbumId(props.contentId) || [];
  }
  if (fetchedCovers.length === 0) {
    covers.value = [defaultCardImage];
  } else {
    const selectedCovers = fetchedCovers.slice(0, 4);
    covers.value = selectedCovers.map(coverId => `http://localhost:8021/api/music-files/covers/${coverId}/image`);
  }
});

onUnmounted(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
    resizeObserver = null;
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.card-button {
  width: 100%;
  height: 100%;

  background-color: #FAF8F6;
  border-color: #F0EAE4;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
}

.card-button:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 15px #25232344;
}

.card-button:active {
  transform: scale(0.98);
  box-shadow: 0 4px 10px #25232344;
}

.content {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  position: relative;
}

.card-image >>> img {
  width: 100%;
}

.card-image-full {
  width: 100%;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
}

.card-image-half-left {
  border-radius: 10px;
  width: 100%;
  position: absolute;
  left: -25.5%;
  top: 0;
  clip-path: inset(0% 25.5% round 10px 0px 0px 10px);
}

.card-image-half-right {
  border-radius: 10px;
  width: 100%;
  position: absolute;
  right: -25.5%;
  top: 0;
  clip-path: inset(0% 25.5% round 0px 10px 10px 0px);
}

.card-image-quarter-top-left {
  width: 49%;
  border-top-left-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
}

.card-image-quarter-top-right {
  width: 49%;
  border-top-right-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

.card-image-quarter-bottom-left {
  width: 49%;
  border-bottom-left-radius: 10px;
  position: absolute;
  left: 0;
  bottom: 40px;
}

.card-image-quarter-bottom-right {
  width: 49%;
  border-bottom-right-radius: 10px;
  position: absolute;
  right: 0;
  bottom: 40px;
}

.card-text-wrapper {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 4px;
  overflow: hidden;
  position: absolute;
}

.card-text {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-button-wrapper {
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 10px;
  right: 10px;
  bottom: 50px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.card-button:hover .sub-button-wrapper {
  opacity: 1;
  pointer-events: auto;
}

.card-sub-button {
  height: 30px;
  width: 30px;
}
</style>