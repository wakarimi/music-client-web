<template>
  <div
      class="rooms-tab"
  >
    <CustomHeader
        class="header"
    >
      <template #left>
        <CustomButton
            class="square-header-element"
            :button-icon="backIcon"
            inner-indent="5px"
            style="margin: 6px"
        />
        <span>
          TODO: Название комнаты
        </span>
      </template>
    </CustomHeader>
  </div>
</template>

<script lang="ts" setup>
import CustomHeader from "@/components/base/custom/CustomHeader.vue";
import CustomButton from "@/components/base/custom/CustomButton.vue";

import backIcon from "@/assets/icons/100/back.svg"
</script>

<style scoped>
.rooms-tab {
  display: flex;
  flex-direction: column;
}

.header-element {
  height: 30px;
}

.square-header-element {
  width: 30px;
  height: 30px;
}
</style>