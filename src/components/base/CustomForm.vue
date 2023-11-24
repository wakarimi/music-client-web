<template>
  <div class="empty-form">
    <BaseForm
        :title-text="titleText"
        class="base-form"
    >
      <slot>

      </slot>
    </BaseForm>
  </div>
</template>

<script lang="ts" setup>
import BaseForm from "@/components/base/form/BaseForm.vue";

defineProps({
  titleText: String
});
</script>

<style scoped>
.empty-form {

}

.base-form {

}
</style>