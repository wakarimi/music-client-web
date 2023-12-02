<template>
  <div class="current-state-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            :button-icon="door"
            button-padding="5px"
            button-text="Комнаты"
            class="header-rooms"
            text-size="16px"
            @click="openRoomsTab()"
        />
        <CustomButton
            :button-icon="items"
            button-padding="5px"
            class="header-queue"
            text-size="16px"
            @click="openQueueTab()"
        />
      </template>
      <template #right>
        <CustomButton
            :button-icon="person"
            :button-text="currentUsername"
            button-padding="5px"
            class="header-account"
            text-size="16px"
            @click="openAccountTab()"
        />
      </template>
    </CustomHeader>
    <div class="tab-content">
      <component :is="currentPanel"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomHeader from "@/components/base/CustomHeader.vue";
import CustomButton from "@/components/base/CustomButton.vue";
import {defineComponent, nextTick, onMounted, ref} from "vue";
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
.current-state-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  flex-shrink: 0;
  height: 30px;
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
  height: calc(100% - 113px);
}
</style>

