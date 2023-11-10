<template>
  <div class="empty-form">
    <BaseForm
        class="base-form"
        :title-text="titleText"
    >
      <slot>

      </slot>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/base/form/BaseForm.vue";

defineProps({
  titleText: String
});
</script>

<style scoped>
.empty-form {

}
</style>