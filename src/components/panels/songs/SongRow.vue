<template>
  <div class="track-row" ref="trackRowRef">
    <BaseButton
        class="song"
        :button-text="rowText"
        button-type="song"
        :button-value="songId"
        :size-change-percent="0.25"
    >
      <template #image>
        <img :src="currentCover" alt="cover">
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
import coverIcon from "@/assets/default/cover.svg";
import {onUnmounted, ref} from "vue";
import {onMounted} from "vue";
import {useDirsStore} from "@/stores/useDirStore";

const props = defineProps({
  songId: {
    type: Number,
    required: true,
  },
  audioFileId: {
    type: Number,
    required: true,
  },
  rowText: {
    type: String,
  }
})

let currentCover = ref(coverIcon)
const dirStore = useDirsStore();

const getCover = async (audioFileId: number): Promise<void> => {
  if (!dirStore.bestCoverForAudioFile.has(audioFileId)) {
    await dirStore.fetchBestCoverForAudioFile(audioFileId)
  }
  const cover = dirStore.bestCoverForAudioFile.get(audioFileId)
  if (!cover) {
    currentCover.value = coverIcon
  } else {
    currentCover.value = 'http://localhost:8022/api/covers/' + cover + '/image'
  }
};

const trackRowRef = ref(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        getCover(props.audioFileId);
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1
  });

  if (trackRowRef.value) {
    observer.observe(trackRowRef.value);
  }
});

onUnmounted(() => {
  if (observer && trackRowRef.value) {
    observer.unobserve(trackRowRef.value);
  }
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
.track-row {

}
</style>