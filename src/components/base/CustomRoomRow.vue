<template>
  <div
      class="custom-song-row"
  >
    <button
        class="song-row-button"
    >
      <div class="song-row-left">
        <img
            :src="getIcon()"
            alt="song-cover"
            class="song-cover">
        <span class="song-description">
          {{ roomName }}
        </span>
      </div>
      <div class="song-row-right">
        <div class="control-button-wrapper">
          <CustomButton
              :button-icon="shareIcon"
              :size-change-percent="2"
              button-padding="5px"
              class="control-button right-element"
              @click="handleShareClick($event, roomId)"
          />
          <CustomButton
              :button-icon="leaveIcon"
              :size-change-percent="2"
              button-padding="4px"
              class="control-button right-element"
              @click="handleLeaveClick($event, roomId)"
          />
        </div>
        <span class="song-duration right-element">
          В комнате: {{ roomOnline }}
        </span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {useSongsStore} from "@/stores/useSongsStore";
import defaultCover from "@/assets/default/cover.svg"
import CustomButton from "@/components/base/CustomButton.vue";
import shareIcon from "@/assets/icons/room-control/share.svg"
import leaveIcon from "@/assets/icons/room-control/leave.svg"
import {useCoversStore} from "@/stores/useCoversStore";

const props = defineProps({
  roomId: {
    type: Number,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomOnline: {
    type: Number,
    default: 0,
  },
})

const songStore = useSongsStore()
const coverStore = useCoversStore()

function getIcon(): string {
  return defaultCover;
}

const emit = defineEmits([
  'share-click',
  'leave-click',
]);

function handleShareClick(event: MouseEvent, roomId: number) {
  event.stopPropagation()
  emit('share-click', roomId);
}

function handleLeaveClick(event: MouseEvent, roomId: number) {
  event.stopPropagation()
  emit('leave-click', roomId);
}
</script>

<style scoped>
.song-row-button {
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
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s ease,
  box-shadow 0.2s ease;
}

.song-row-button:hover {
  transform: scale(1.005);
  box-shadow: 1px 1px 3px #25232344;
}

.song-row-button:active {
  transform: scale(0.995);
  box-shadow: 1px 1px 2px #25232344;
}

.song-row-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  position: relative;
  height: 100%;
}

.song-row-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
}

.control-button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.song-row-button:hover .control-button-wrapper {
  opacity: 1;
  pointer-events: auto;
}

.song-cover {
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  position: relative;
  border-radius: 10px;
}

.song-cover >>> img {
  height: 100%;
}

.song-description {
  padding-left: 10px;
  font-size: 15px;
}

.control-button {
  height: 80%;
}

.right-element {
  padding-left: 4px;
}

.song-duration {
  padding: 8px;
  font-size: 15px;
}
</style>