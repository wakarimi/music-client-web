<template>
  <CustomWindow
      @backgroundClick="handleCloseCreateRoomWindow"
  >
    <div class="form">
      <CustomTextField
          class="row"
          placeholder-text="Название комнаты"
          v-model="roomName"
      />
      <div class="control-buttons row">
        <CustomButton
            button-text="Создать"
            class="row"
            :size-change-percent="2"
            border-color="#CCE8B0"
            background-color="#E5F4D7"
            border-color-hover="#A5D773"
            background-color-hover="#CCE8B0"
            border-color-active="#A5D773"
            background-color-active="#CCE8B0"
            @click="handleCreateRoom"
        />
        <CustomButton
            button-text="Отмена"
            class="row"
            :size-change-percent="2"
            border-color="#F8A0A0"
            background-color="#FBD0D0"
            border-color-hover="#F25757"
            background-color-hover="#F8A0A0"
            border-color-active="#F25757"
            background-color-active="#F8A0A0"
            @click="handleCloseCreateRoomWindow"
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

const roomStore = useRoomsStore();

const roomName = ref<string>("")

const emit = defineEmits([
  'close-window-click'
]);

async function handleCreateRoom() {
  try {
    await roomStore.create(roomName.value)
    handleCloseCreateRoomWindow()
  } catch (error) {
    console.log(error)
  }
}

function handleCloseCreateRoomWindow() {
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

.row {
  height: 40px;
}
</style>