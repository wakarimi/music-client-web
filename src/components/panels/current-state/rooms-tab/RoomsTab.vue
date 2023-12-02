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
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
        </div>
      </div>
      <div class="sub-menu">
        <span>
          Участники комнаты
        </span>
        <div class="room-list">
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
          <CustomRoomRow
              class="room-item"
              :room-id="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/base/CustomButton.vue";

import joinIcon from "@/assets/icons/room-control/join.svg"
import createIcon from "@/assets/icons/room-control/create.svg"
import CustomRoomRow from "@/components/base/CustomRoomRow.vue";

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