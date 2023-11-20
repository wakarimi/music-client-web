<template>
  <div class="playlists-panel">
    <CustomHeader
        class="header"
    >
      <template #left>
        Плейлисты
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