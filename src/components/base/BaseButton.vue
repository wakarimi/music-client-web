<template>
  <div class="base-button">
    <BaseInteractive
        class="base-interactive"
        @interactiveClick="emitButtonClick()"
    >
      <div class="content-wrapper">
        <div class="button-image">
          <slot name="image"></slot>
        </div>
        <div class="button-text">
          {{ buttonText }}
        </div>
      </div>
    </BaseInteractive>
  </div>
</template>

<script setup lang="ts">
import BaseInteractive from "@/components/base/BaseInteractive.vue";
import type {PropType} from "vue";

const props = defineProps({
  buttonText: {
    type: String,
  },
  buttonType: {
    type: String,
    required: true,
  },
  buttonValue: {
    type: [Number, null] as PropType<number | null>,
    default: null,
  },
})

const emit = defineEmits(["button-click"]);
function emitButtonClick() {
  emit("button-click", );
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.base-button {
  height: 100%;
}

.base-interactive {
  height: 100%;
  display: flex;
  align-items: center;
}

.content-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.button-image {
  width: auto;
  height: 100%;
  user-select: none;
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.button-text {
  user-select: none;
  font-size: 14px;
}
</style>