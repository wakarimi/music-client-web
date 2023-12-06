<template>
  <div class="base-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.base-header {
  width: 100%;
  height: 100%;
  background-color: #FAF8F6;
  border-bottom-width: 1px;
  border-bottom-color: #EBE3DB;
  border-bottom-style: solid;
}

.left {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
}

.right {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
}
</style>