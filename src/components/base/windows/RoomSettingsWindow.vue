<template>
  <CustomWindow
      @backgroundClick="handleClose"
  >
    <div class="form">
      <div class="row">
        <CustomTextField
            class="row-element"
            placeholder-text="Тут должно быть имя комнаты"
            v-model="roomName"
        />
        <CustomButton
            class="square-row-element"
            :button-icon="saveIcon"
            button-padding="8px"
            :size-change-percent="2"
            @click="handleRename"
        />
      </div>
      <div class="row">
        <CustomTextField
            class="row-element"
            :is-readonly="true"
            placeholder-text="Тут будет код комнаты"
            v-model="shareCode"
        />
        <CustomButton
            class="square-row-element"
            :button-icon="generateIcon"
            button-padding="8px"
            :size-change-percent="2"
            @click="handleGenerateShareCode"
        />
        <CustomButton
            class="square-row-element"
            :button-icon="copyIcon"
            button-padding="8px"
            :size-change-percent="2"
            @click="handleCopyShareCore"
        />
        <CustomButton
            class="square-row-element"
            :button-icon="removeIcon"
            button-padding="8px"
            :size-change-percent="2"
            @click="handleDeleteShareCore"
        />
      </div>
      <div class="control-buttons row-element">
        <CustomButton
            button-text="Закрыть"
            class="row-element"
            :size-change-percent="2"
            border-color="#A9CCEF"
            background-color="#D4E5F7"
            border-color-hover="#69A6E3"
            background-color-hover="#A9CCEF"
            border-color-active="#69A6E3"
            background-color-active="#A9CCEF"
            @click="handleClose"
        />
      </div>
    </div>
  </CustomWindow>
</template>

<script lang="ts" setup>
import CustomTextField from "@/components/base/CustomTextField.vue";
import CustomWindow from "@/components/base/CustomWindow.vue";
import CustomButton from "@/components/base/CustomButton.vue";
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


async function handleCopyShareCore() {
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


async function handleDeleteShareCore() {
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