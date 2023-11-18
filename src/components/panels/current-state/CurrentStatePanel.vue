<template>
  <div class="current-state-panel">
    <CustomHeader
      class="header"
    >
      <template #left>
        <CustomButton
            class="header-rooms"
            button-text="Комнаты"
            :button-icon="door"
            text-size="16px"
            @click="openRoomsTab()"
        />
        <CustomButton
            class="header-queue"
            :button-icon="items"
            text-size="16px"
            @click="openQueueTab()"
        />
      </template>
      <template #right>
        <CustomButton
            class="header-account"
            :button-text="currentUsername"
            :button-icon="person"
            text-size="16px"
            @click="openAccountTab()"
        />
      </template>
    </CustomHeader>
    <div class="tab-content">
      <component :is="currentPanel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import {defineComponent, onMounted, ref, nextTick} from "vue";
import QueueTab from "@/components/panels/current-state/queue-tab/QueueTab.vue";
import RoomsTab from "@/components/panels/current-state/rooms-tab/RoomsTab.vue";
import AccountTab from "@/components/panels/current-state/account-tab/AccountTab.vue";
import door from '@/assets/icons/door.svg'
import items from '@/assets/icons/items.svg'
import person from '@/assets/icons/person.svg'
import {useAccountsStore} from "@/stores/useAccountsStore";

const accountStore = useAccountsStore()

const currentUsername = ref("Аккаунт")
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

onMounted(async () => {
  await nextTick();
  if (accountStore.myAccount == null) {
    await accountStore.fetchMe();
  }
  if (accountStore.myAccount) {
    currentUsername.value = accountStore.myAccount.username;
  }
});
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

.tab-content {
  padding: 10px;
}
</style>

