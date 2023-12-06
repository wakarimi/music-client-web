<template>
  <div
      class="custom-room-row"
  >
    <button
        class="room-row-button"
    >
      <div class="room-row-left">
        <img
            :src="getIcon()"
            alt="room-cover"
            class="room-cover">
        <span class="room-description">
          {{ username }}
        </span>
      </div>
      <div class="room-row-right">
        <div class="control-button-wrapper">
          <CustomButton
              v-if="isOwner"
              :button-icon="leaveIcon"
              :size-change-percent="2"
              button-padding="4px"
              class="control-button right-element"
              @click="handleDeleteClick($event)"
          />
        </div>
        <span class="right-element">
<!--          {{ online ? "Онлайн" : "Оффлайн" }} онлайн-->
        </span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/base-backup/CustomButton.vue";
import leaveIcon from "@/assets/icons/room-control/leave.svg"
import ownerIcon from "@/assets/icons/room-control/owner.svg"
import memberIcon from "@/assets/icons/room-control/member.svg"

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  isOwner: {
    type: Boolean,
    required: true,
  },
})

function getIcon(): string {
  if (props.isOwner) {
    return ownerIcon;
  } else {
    return memberIcon;
  }
}

const emit = defineEmits([
  'delete-click',
]);

function handleDeleteClick(event: MouseEvent) {
  event.stopPropagation()
  emit('delete-click');
}
</script>

<style scoped>
.room-row-button {
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

.room-row-button:hover {
  transform: scale(1.005);
  box-shadow: 1px 1px 3px #25232344;
}

.room-row-button:active {
  transform: scale(0.995);
  box-shadow: 1px 1px 2px #25232344;
}

.room-row-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  position: relative;
  height: 100%;
}

.room-row-right {
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

.room-row-button:hover .control-button-wrapper {
  opacity: 1;
  pointer-events: auto;
}

.room-cover {
  height: 60%;
  width: auto;
  aspect-ratio: 1;
  position: relative;
  padding-left: 6px;
}

.room-cover >>> img {
  height: 100%;
}

.room-description {
  white-space: nowrap;
  padding-left: 10px;
  font-size: 15px;
}

.control-button {
  height: 80%;
}

.right-element {
  white-space: nowrap;
  padding-right: 6px;
}
</style>