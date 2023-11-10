<template>
  <div class="base-header">
    <div class="title">
      {{ titleText }}
    </div>
    <slot>

    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  titleText: {
    type: String,
  },
})
</script>

<style scoped>
.base-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  background-color: #F5F1ED;
  border-bottom-width: 2px;
  border-bottom-color: #F0EAE4;
  border-bottom-style: solid;
  padding: 10px;
}

.title {
  user-select: none;
  font-size: 16px;
  margin: 10px;
}
</style>