<template>
  <CustomWindow
      @backgroundClick="handleClose"
  >
    <div class="form">
      <CustomTextField
          class="row-element"
          :is-readonly="true"
          v-model="roomName"
      />
      <div class="row-element share-code-row">
        <CustomTextField
            class="row-element"
            :is-readonly="true"
            v-model="shareCode"
        />
        <CustomButton
            class="square-row-element"
            :button-icon="generateIcon"
            button-padding="8px"
            :size-change-percent="2"
            @click="handleGenerateShareCore"
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
            button-text="Ок"
            class="row-element"
            :size-change-percent="2"
            border-color="#CCE8B0"
            background-color="#E5F4D7"
            border-color-hover="#A5D773"
            background-color-hover="#CCE8B0"
            border-color-active="#A5D773"
            background-color-active="#CCE8B0"
            @click="handleClose"
        />
        <CustomButton
            button-text="Отмена"
            class="row-element"
            :size-change-percent="2"
            border-color="#F8A0A0"
            background-color="#FBD0D0"
            border-color-hover="#F25757"
            background-color-hover="#F8A0A0"
            border-color-active="#F25757"
            background-color-active="#F8A0A0"
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
  'close-window-click'
]);

async function handleGenerateShareCore() {
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
    } else {
      console.error("Clipboard API not available or share code is empty");
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

.share-code-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>