<template>
  <div class="last-songs-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Недавние
      </template>
    </CustomHeader>
  </div>
</template>

<script lang="ts" setup>
import CustomHeader from "@/components/base-backup/CustomHeader.vue";
</script>

<style scoped>
.header {
  height: 30px;
  display: flex;
  flex-direction: row;
}
</style>