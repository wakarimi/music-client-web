<template>
  <div class="base-form">
    <div class="title">
      {{ titleText }}
    </div>
    <slot>

    </slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  titleText: String
});
</script>

<style scoped>
.base-form {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #EBE3DB;
  background-color: #FAF8F6;
  padding: 10px;
}

.title {
  text-align: center;
  font-size: 24px;
  padding-bottom: 10px;
}
</style>