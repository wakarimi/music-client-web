<template>
  <CustomWindow
      @backgroundClick="handleCloseJoinRoomWindow"
  >
    <div class="form">

      <div class="row">
        <CustomTextField
            v-model="shareCode"
            class="row"
            placeholder-text="Вставьте код подключения"
        />
        <CustomButton
            :button-icon="pasteIcon"
            :size-change-percent="2"
            button-padding="8px"
            class="square-row-element"
            @click="handlePasteShareCode"
        />
      </div>
      <div class="control-buttons row">
        <CustomButton
            :size-change-percent="2"
            background-color="#E5F4D7"
            background-color-active="#CCE8B0"
            background-color-hover="#CCE8B0"
            border-color="#CCE8B0"
            border-color-active="#A5D773"
            border-color-hover="#A5D773"
            button-text="Войти"
            class="row"
            @click="handleJoinRoom"
        />
        <CustomButton
            :size-change-percent="2"
            background-color="#FBD0D0"
            background-color-active="#F8A0A0"
            background-color-hover="#F8A0A0"
            border-color="#F8A0A0"
            border-color-active="#F25757"
            border-color-hover="#F25757"
            button-text="Отмена"
            class="row"
            @click="handleCloseJoinRoomWindow"
        />
      </div>
    </div>
  </CustomWindow>
</template>

<script lang="ts" setup>
import CustomTextField from "@/components/base-backup/CustomTextField.vue";
import CustomWindow from "@/components/base-backup/CustomWindow.vue";
import CustomButton from "@/components/base-backup/CustomButton.vue";
import {ref} from "vue";
import {useRoomsStore} from "@/stores/useRoomsStore";
import pasteIcon from "@/assets/icons/60/paste.svg";

const roomStore = useRoomsStore();

const shareCode = ref<string>("")

const emit = defineEmits([
  'close-window-click',
  'room-updated'
]);

async function handlePasteShareCode() {
  try {
    shareCode.value = await navigator.clipboard.readText();
  } catch (error) {
    console.error('Ошибка при вставке из буфера обмена:', error);
  }
}

async function handleJoinRoom() {
  try {
    await roomStore.join(shareCode.value)
    handleUpdated()
    handleCloseJoinRoomWindow()
  } catch (error) {
    console.log(error)
  }
}

function handleUpdated() {
  emit('room-updated');
}

function handleCloseJoinRoomWindow() {
  emit('close-window-click');
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
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