<template>
  <CustomWindow
      @backgroundClick="handleClose"
  >
    <div class="form">
      <div class="row">
        <CustomTextField
            v-model="roomName"
            class="row-element"
            placeholder-text="Тут должно быть имя комнаты"
        />
        <CustomButton
            :button-icon="saveIcon"
            :size-change-percent="2"
            button-padding="8px"
            class="square-row-element"
            @click="handleRename"
        />
      </div>
      <div class="row">
        <CustomTextField
            v-model="shareCode"
            :is-readonly="true"
            class="row-element"
            placeholder-text="Тут будет код комнаты"
        />
        <CustomButton
            :button-icon="generateIcon"
            :size-change-percent="2"
            button-padding="8px"
            class="square-row-element"
            @click="handleGenerateShareCode"
        />
        <CustomButton
            :button-icon="copyIcon"
            :size-change-percent="2"
            button-padding="8px"
            class="square-row-element"
            @click="handleCopyShareCode"
        />
        <CustomButton
            :button-icon="removeIcon"
            :size-change-percent="2"
            button-padding="8px"
            class="square-row-element"
            @click="handleDeleteShareCode"
        />
      </div>
      <div class="control-buttons row-element">
        <CustomButton
            :size-change-percent="2"
            background-color="#D4E5F7"
            background-color-active="#A9CCEF"
            background-color-hover="#A9CCEF"
            border-color="#A9CCEF"
            border-color-active="#69A6E3"
            border-color-hover="#69A6E3"
            button-text="Закрыть"
            class="row-element"
            @click="handleClose"
        />
      </div>
    </div>
  </CustomWindow>
</template>

<script lang="ts" setup>
import CustomTextField from "@/components/base-backup/CustomTextField.vue";
import CustomWindow from "@/components/base-backup/CustomWindow.vue";
import CustomButton from "@/components/base-backup/CustomButton.vue";
import {nextTick, onMounted, ref} from "vue";
import {useRoomsStore} from "@/stores/useRoomsStore";
import {useShareCodesStore} from "@/stores/useShareCodesStore";
import generateIcon from "@/assets/icons/60/generate.svg"
import saveIcon from "@/assets/icons/60/save.svg"
import copyIcon from "@/assets/icons/60/copy.svg"
import removeIcon from "@/assets/icons/60/remove.svg"

const roomStore = useRoomsStore();
const shareCodeStore = useShareCodesStore();

const roomName = ref<string>("")
const shareCode = ref<string>("")

const props = defineProps({
  roomId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits([
  'room-updated',
  'close-window-click',
]);

async function handleRename() {
  try {
    await roomStore.rename(props.roomId, roomName.value);
    handleUpdated();
  } catch (error) {
    console.log(error);
  }
}

async function handleGenerateShareCode() {
  try {
    await shareCodeStore.generate(props.roomId);
    await fetchShareCode();
  } catch (error) {
    console.log(error);
  }
}


async function handleCopyShareCode() {
  try {
    if (navigator.clipboard && shareCode.value) {
      await navigator.clipboard.writeText(shareCode.value);
    } else if (!navigator.clipboard) {
      console.error("Clipboard API not available");
    } else if (!shareCode.value) {
      console.error("Share code is empty");
    }
  } catch (error) {
    console.error("Error copying to clipboard: ", error);
  }
}


async function handleDeleteShareCode() {
  try {
    await shareCodeStore.delete(props.roomId);
    shareCode.value = ""
  } catch (error) {
    console.log(error);
  }
}

async function fetchRoomName() {
  let roomLocal = roomStore.getById(props.roomId)
  if (!roomLocal) {
    await roomStore.fetchMyRooms()
    roomLocal = roomStore.getById(props.roomId)
    roomStore.resetMyRooms()
  }
  if (roomLocal) {
    roomName.value = roomLocal.name
  }
}

async function fetchShareCode() {
  let shareCodeLocal = shareCodeStore.getShareCodeByRoomId(props.roomId)
  if (!shareCodeLocal) {
    await shareCodeStore.fetchByRoomId(props.roomId)
    shareCodeLocal = shareCodeStore.getShareCodeByRoomId(props.roomId)
  }
  if (shareCodeLocal) {
    shareCode.value = shareCodeLocal
  }
}

onMounted(async () => {
  await nextTick();
  await fetchRoomName();
  await fetchShareCode();
});

function handleUpdated() {
  emit('room-updated');
}

function handleClose() {
  emit('close-window-click');
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
}

.control-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.row-element {
  height: 40px;
}

.square-row-element {
  height: 40px;
  width: 40px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 40px;
}
</style>