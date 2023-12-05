<template>
  <JoinRoomWindow
      v-if="isJoinRoomWindowVisible"
      @roomUpdated="handleRoomUpdated"
      @closeWindowClick="handleCloseJoinWindow"
  />

  <CreateRoomWindow
      v-if="isCreateRoomWindowVisible"
      @closeWindowClick="handleCloseCreateRoomWindow"
  />

  <RoomSettingsWindow
      v-if="isRoomSettingsWindowVisible"
      :room-id="settingsRoomId ? settingsRoomId : 0"
      @roomUpdated="handleRoomUpdated"
      @closeWindowClick="handleCloseRoomSettingsWindow"
  />

  <div class="rooms-tab">
    <div class="control">
      <CustomButton
          :button-icon="joinIcon"
          :size-change-percent="2"
          button-padding="5px"
          button-text="Войти"
          text-size="16px"
          @click="handleOpenJoinWindow"
      />
      <CustomButton
          :button-icon="createIcon"
          :size-change-percent="2"
          button-padding="5px"
          button-text="Создать"
          text-size="16px"
          @click="handleOpenCreateWindow"
      />
    </div>
    <div class="rooms-content">
      <div class="sub-menu">
        <span>
          Мои комнаты
        </span>
        <div class="room-list-wrapper">
          <div class="room-list">
            <CustomRoomRow
                v-for="room in myRooms"
                :key="room.id"
                :is-owner="currentUserId === room.ownerId"
                :room-id="room.id"
                :room-name="room.name"
                class="room-item"
                @settingsClick="handleOpenRoomSettings"
                @leaveClick="handleLeaveRoom"
            />
          </div>
        </div>
      </div>
      <div class="sub-menu">
        <span>
          Участники комнаты
        </span>
        <div class="room-list-wrapper">
          <div class="room-list">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/base/CustomButton.vue";
import joinIcon from "@/assets/icons/room-control/join.svg";
import createIcon from "@/assets/icons/room-control/create.svg";
import CustomRoomRow from "@/components/base/CustomRoomRow.vue";
import {nextTick, onMounted, ref} from "vue";
import {useRoomsStore} from "@/stores/useRoomsStore";
import type {Room} from "@/services/RoomService";
import {useAccountsStore} from "@/stores/useAccountsStore";
import CreateRoomWindow from "@/components/base/windows/CreateRoomWindow.vue";
import RoomSettingsWindow from "@/components/base/windows/RoomSettingsWindow.vue";
import JoinRoomWindow from "@/components/base/windows/JoinRoomWindow.vue";

const roomStore = useRoomsStore();
const accountStore = useAccountsStore();

const currentUserId = ref<number | null>(null);
const myRooms = ref<Room[]>([]);

const settingsRoomId = ref<number | null>(null);
const isJoinRoomWindowVisible = ref<boolean>(false);
const isCreateRoomWindowVisible = ref<boolean>(false);
const isRoomSettingsWindowVisible = ref<boolean>(false);

function handleOpenCreateWindow() {
  isCreateRoomWindowVisible.value = true;
}

function handleCloseCreateRoomWindow() {
  isCreateRoomWindowVisible.value = false;
  fetchRooms();
}

function handleRoomUpdated() {
  fetchRooms();
}

async function handleLeaveRoom(roomId: number) {
  await roomStore.leave(roomId);
  fetchRooms();
}

function handleOpenRoomSettings(roomId: number) {
  settingsRoomId.value = roomId;
  isRoomSettingsWindowVisible.value = true;
}

function handleCloseRoomSettingsWindow() {
  isRoomSettingsWindowVisible.value = false;
  settingsRoomId.value = null;
  fetchRooms();
}

async function fetchRooms() {
  if (!roomStore.getMyRooms) {
    await roomStore.fetchMyRooms();
  }
  myRooms.value = roomStore.getMyRooms || [];
  roomStore.resetMyRooms();
}

function handleOpenJoinWindow() {
  isJoinRoomWindowVisible.value = true;
}

function handleCloseJoinWindow() {
  isJoinRoomWindowVisible.value = false;
}

onMounted(async () => {
  await nextTick();

  fetchRooms()

  if (!accountStore.myAccount) {
    await accountStore.fetchMe()
  }
  const currentUser = accountStore.myAccount
  if (currentUser) {
    currentUserId.value = currentUser.id
  }
});

</script>

<style scoped>
.rooms-tab {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.control {
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 32px;
}

.rooms-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 54px);
  gap: 10px;
}

.sub-menu {
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.room-list-wrapper {
  overflow-y: scroll;
  height: 100%;
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 10px;
}

.room-item {
  height: 40px;
}
</style>