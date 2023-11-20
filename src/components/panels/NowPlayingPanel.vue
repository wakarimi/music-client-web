<template>
  <div class="now-playing-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Текущее
      </template>
    </CustomHeader>
  </div>
</template>

<script setup lang="ts">
import CustomHeader from "@/components/base/CustomHeader.vue";
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}
</style>