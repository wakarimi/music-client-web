<template>
  <div
      class="current-state-panel"
      ref="headerRef"
  >
    <CustomHeader class="header">
      <template #left>
        <div ref="roomsRef">
          <CustomButton
              :class="[roomsText ? 'header-element' : 'square-header-element', 'left-header-element']"
              :button-icon="roomsIcon"
              :button-text="roomsText"
              text-size="16px"
              inner-indent="8px"
          />
        </div>
        <div ref="queueRef">
          <CustomButton
              class="square-header-element left-header-element"
              :button-icon="queueIcon"
              inner-indent="8px"
          />
        </div>
      </template>
      <template #right>
        <div ref="accountRef">
          <CustomButton
              :class="[accountText ? 'header-element' : 'square-header-element', 'right-header-element']"
              :button-icon="accountIcon"
              :button-text="accountText"
              text-size="16px"
              inner-indent="8px"
          />
        </div>
      </template>
    </CustomHeader>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, ref} from "vue";

import {useAccountsStore} from "@/stores/useAccountsStore";

import CustomHeader from "@/components/base/custom/CustomHeader.vue";
import CustomButton from "@/components/base/custom/CustomButton.vue";

import roomsIcon from "@/assets/icons/100/rooms.svg"
import queueIcon from "@/assets/icons/100/queue.svg"
import accountIcon from "@/assets/icons/100/account.svg"

const accountStore = useAccountsStore();

const roomsText = ref<string | null>("Комната")
const accountText = ref<string | null>("Zalimannard")

const headerRef = ref<HTMLElement | null>(null);
const roomsRef = ref<typeof CustomButton>();
const queueRef = ref<typeof CustomButton>();
const accountRef = ref<typeof CustomButton>();
const horizontalInterval = 8;
const minimalElementDivWidth = 44;
const roomsRefInitialWidth = ref<number | null>(null)
const queueRefInitialWidth = ref<number | null>(null)
const accountRefInitialWidth = ref<number | null>(null)

const calcInitialWidths = () => {
  if (!headerRef.value || !roomsRef.value || !queueRef.value || !accountRef.value) {
    return;
  } else {
    roomsRefInitialWidth.value = roomsRef.value.offsetWidth;
    queueRefInitialWidth.value = queueRef.value.offsetWidth;
    accountRefInitialWidth.value = accountRef.value.offsetWidth;
  }
};

function resetInitialWidths() {
  roomsRefInitialWidth.value = null;
  queueRefInitialWidth.value = null;
  accountRefInitialWidth.value = null;
}

async function actualizeRoomText() {
  let myAccount = accountStore.getMyAccount;
  if (!myAccount) {
    await accountStore.fetchMe();
    myAccount = accountStore.getMyAccount;
  }
  if (myAccount) {
    if (roomsText.value != myAccount.username) {
      roomsText.value = myAccount.username
      resetInitialWidths();
    }
  }
}

async function actualizeAccountText() {
  let myAccount = accountStore.getMyAccount;
  if (!myAccount) {
    await accountStore.fetchMe();
    myAccount = accountStore.getMyAccount;
  }
  if (myAccount) {
    if (accountText.value != myAccount.username) {
      accountText.value = myAccount.username
      resetInitialWidths();
    }
  }
}

const checkButtonSize = async () => {
  if (!headerRef.value || !roomsRef.value || !queueRef.value || !accountRef.value) {
    return;
  }

  await actualizeRoomText()
  await actualizeAccountText()

  if (!roomsRefInitialWidth.value || !queueRefInitialWidth.value || !accountRefInitialWidth.value) {
    calcInitialWidths();
  }
  if (roomsRefInitialWidth.value && queueRefInitialWidth.value && accountRefInitialWidth.value) {
    const headerWidth = headerRef.value.offsetWidth;

    if (roomsRefInitialWidth.value + queueRefInitialWidth.value + accountRefInitialWidth.value + horizontalInterval < headerWidth) {
      return
    } else if (roomsRefInitialWidth.value + queueRefInitialWidth.value + minimalElementDivWidth + horizontalInterval < headerWidth) {
      accountText.value = null;
    } else {
      roomsText.value = null;
      accountText.value = null;
    }
  } else {
    console.log("Не удалось подсчитать ширины компонентов")
  }
};

onMounted(async () => {
  window.addEventListener('resize', checkButtonSize);
  await nextTick();
  await checkButtonSize()
});

onUnmounted(() => {
  window.removeEventListener('resize', checkButtonSize);
});
</script>

<style scoped>
.current-state-panel {
  min-width: 140px;
}

.header {
  display: flex;
  flex-direction: row;
}

.header-element {
  height: 36px;
}

.square-header-element {
  width: 36px;
  height: 36px;
}

.left-header-element {
  margin: 8px 0 8px 8px;
}

.right-header-element {
  margin: 8px 8px 8px 0;
}
</style>

