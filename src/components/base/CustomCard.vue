<template>
  <div class="custom-card">
    <button
        class="card-button"
    >
      <div class="content">
        <img class="card-image" v-lazy="cardImage" alt="cardImage">
        <div class="card-text-wrapper">
          <span class="card-text">{{ cardText }}</span>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import defaultCardImage from "@/assets/default/cover.svg";
import {nextTick} from "vue";
import {useCoversStore} from "@/stores/useCoversStore";

const props = defineProps({
  contentType: {
    type: String, // album, artist, genre, playlist, directory, audioFile
    required: true
  },
  contentId: {
    type: Number,
    required: true
  },
  cardText: {
    type: String
  },
  sizeChangePercent: {
    type: Number,
    default: 2
  },
})

let cardImage = ref(defaultCardImage)
const coversStore = useCoversStore();

onMounted(async () => {
  await nextTick();
  if (props.contentType === 'album') {
    if (!coversStore.coverByAlbumId.has(props.contentId)) {
      await coversStore.fetchAlbumCovers(props.contentId);
    }
    let covers = coversStore.coverByAlbumId.get(props.contentId)
    if (covers) {
      if (covers.length > 0) {
        cardImage.value = 'http://localhost:8022/api/covers/' + covers[0] + '/image'
      }
    }
  } else if (props.contentType === 'artist') {
    if (!coversStore.coverByArtistId.has(props.contentId)) {
      await coversStore.fetchArtistCovers(props.contentId);
    }
    let covers = coversStore.coverByArtistId.get(props.contentId)
    if (covers) {
      if (covers.length > 0) {
        cardImage.value = 'http://localhost:8022/api/covers/' + covers[0] + '/image'
      }
    }
  } else if (props.contentType === 'genre') {
    if (!coversStore.coverByGenreId.has(props.contentId)) {
      await coversStore.fetchGenreCovers(props.contentId);
    }
    let covers = coversStore.coverByGenreId.get(props.contentId)
    if (covers) {
      if (covers.length > 0) {
        cardImage.value = 'http://localhost:8022/api/covers/' + covers[0] + '/image'
      }
    }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  position: relative;
  border-radius: 10px;
  border-width: 0;
}

.card-image >>> img {
  width: 100%;
}

.card-text-wrapper {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 4px;
  overflow: hidden;
}

.card-text {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>