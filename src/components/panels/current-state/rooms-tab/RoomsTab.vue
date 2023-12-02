<template>
  <div class="rooms-tab">
    <div class="control">
      <CustomButton
          :size-change-percent="2"
          :button-icon="joinIcon"
          button-padding="5px"
          text-size="16px"
          button-text="Войти"
      />
      <CustomButton
          :size-change-percent="2"
          :button-icon="createIcon"
          button-padding="5px"
          text-size="16px"
          button-text="Создать"
      />
    </div>
    <div class="rooms-content">
      <div class="sub-menu">
        <span>
          Мои комнаты
        </span>
        <div class="room-list">
          <CustomRoomRow
              v-for="room in myRooms"
              :key="room.id"
              :room-id="room.id"
              :room-name="room.name"
              class="room-item"
          />
        </div>
      </div>
      <div class="sub-menu">
        <span>
          Участники комнаты
        </span>
        <div class="room-list">
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
import { onMounted, ref } from "vue";
import { useRoomsStore } from "@/stores/useRoomsStore";
import type {Room} from "@/services/RoomService";

const roomStore = useRoomsStore();

const myRooms = ref<Room[]>([]);

onMounted(async () => {
  if (!roomStore.getMyRooms) {
    await roomStore.fetchMyRooms();
  }
  myRooms.value = roomStore.getMyRooms || [];
  roomStore.resetMyRooms();
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
  height: 100%;
  gap: 10px;
}

.sub-menu {
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 10px;
  overflow-y: scroll;
}

.room-item {
  height: 40px;
}
</style>