<template>
  <div class="playback-panel">
    <CustomHeader
      class="header"
    >
      <template #left>
        <CustomButton
            class="header-rooms"
            button-text="Комнаты"
            text-size="16px"
            @click="openRoomsTab()"
        />
        <CustomButton
            class="header-queue"
            button-text="Очередь"
            text-size="16px"
            @click="openQueueTab()"
        />
      </template>
      <template #right>
        <CustomButton
            class="header-account"
            button-text="Аккаунт"
            text-size="16px"
            @click="openAccountTab()"
        />
      </template>
    </CustomHeader>
    <div class="column column-content">
      <component :is="currentPanel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import {defineComponent, ref} from "vue";
import QueueTab from "@/components/panels/current-state/queue-tab/QueueTab.vue";
import RoomsTab from "@/components/panels/current-state/rooms-tab/RoomsTab.vue";
import AccountTab from "@/components/panels/current-state/account-tab/AccountTab.vue";

const currentPanel = ref<ReturnType<typeof defineComponent>>(QueueTab);

function openRoomsTab() {
  currentPanel.value = RoomsTab
}

function openQueueTab() {
  currentPanel.value = QueueTab
}

function openAccountTab() {
  currentPanel.value = AccountTab
}
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}

.header-rooms {
  padding-right: 10px;
}

.header-button {
  width: auto;
}

.tab-list {
  padding: 10px;
}

.tab-item {
  margin-bottom: 1vh;
}
</style>

