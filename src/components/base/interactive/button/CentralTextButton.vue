<template>
  <div class="base-button">
    <BaseInteractive
        class="base-interactive"
        @interactiveClick="emitButtonClick()"
        :size-change-percent="sizeChangePercent"
        :custom-background-color="customBackgroundColor"
        :custom-background-color-hover="customBackgroundColorHover"
        :custom-background-color-active="customBackgroundColorActive"
        :custom-border-color="customBorderColor"
        :custom-border-color-active="customBorderColorActive"
        :custom-border-color-hover="customBorderColorHover"
    >
      <div class="button-text">
        {{ buttonText }}
      </div>
    </BaseInteractive>
  </div>
</template>

<script setup lang="ts">
import BaseInteractive from "@/components/base/interactive/BaseInteractive.vue";
import type {PropType} from "vue";

defineProps({
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
  customBackgroundColor: {
    type: String,
    default: "#F5F1ED",
  },
  customBackgroundColorHover: {
    type: String,
    default: "#F0EAE4",
  },
  customBackgroundColorActive: {
    type: String,
    default: "#F0EAE4",
  },
  customBorderColor: {
    type: String,
    default: "#F0EAE4",
  },
  customBorderColorHover: {
    type: String,
    default: "#EBE3DB",
  },
  customBorderColorActive: {
    type: String,
    default: "#EBE3DB",
  },
  sizeChangePercent: {
    type: Number,
    default: 2,
  },
})

const emit = defineEmits(["button-click"]);

function emitButtonClick() {
  emit("button-click",);
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

.button-text {
  user-select: none;
  font-size: 14px;
  margin: 10px;
}
</style>