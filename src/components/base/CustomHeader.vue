<template>
  <div class="custom-header">
    <div class="header-left">
      <slot name="left"></slot>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.custom-header {
  min-height: 21px;
  height: 100%;
  background-color: #FAF8F6;
  border-bottom-width: 1px;
  border-bottom-color: #EBE3DB;
  border-bottom-style: solid;
  padding: 10px;
}

.header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  gap: 6px;
}

.header-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  gap: 10px;
}
</style>