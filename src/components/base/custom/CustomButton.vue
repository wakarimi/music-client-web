<template>
  <BaseInteractive
      :size-change-percent="2"
      :style="currentStyle"
      class="custom-button"
      @click="handleClick"
      @mousedown="activeIn"
      @mouseleave="mouseLeft"
      @mouseover="hoverIn"
      @mouseup="mouseUpHandler"
  >
    <div :class="contentPositionClass" class="content">
      <img
          v-if="buttonIcon"
          :src="buttonIcon"
          :style="[{borderRadius: iconBorderRadius}]"
          alt="buttonIcon"
          class="button-icon"
      />
      <span
          v-if="buttonText"
          :style="[{fontSize: textSize}, {paddingLeft: innerIndent}, {paddingRight: innerIndent}]"
          class="button-text"
      >
          {{ buttonText }}
        </span>
    </div>
  </BaseInteractive>
</template>

<script lang="ts" setup>
import BaseInteractive from "@/components/base/BaseInteractive.vue";
import {computed, ref} from "vue";
import type {PropType} from "vue";

const props = defineProps({
  buttonText: {
    type: String as PropType<string | null>,
    default: null,
    required: false,
  },
  textSize: {
    type: String,
    default: "18px",
  },

  buttonIcon: {
    type: String,
  },
  iconBorderRadius: {
    type: String,
    default: "0px",
  },

  contentPosition: {
    type: String,
    default: 'center' // left, center, right
  },

  innerIndent: {
    type: String,
    default: '0px'
  },

  textColor: {
    type: String,
    default: '#3B3B3B',
  },
  textColorHover: {
    type: String,
    default: '#252323',
  },
  textColorActive: {
    type: String,
    default: '#252323',
  },
})

const contentPositionClass = computed(() => ({
  'content-left': props.contentPosition === 'left',
  'content-center': props.contentPosition === 'center',
  'content-right': props.contentPosition === 'right'
}))

const isHovering = ref(false);
const isActive = ref(false);

const currentStyle = computed(() => {
  let color = props.textColor;
  let padding = props.innerIndent;

  if (isActive.value) {
    color = props.textColorActive;
  } else if (isHovering.value) {
    color = props.textColorHover;
  }

  return {
    color,
    padding
  };
});

const mouseLeft = () => {
  isHovering.value = false;
  isActive.value = false;
}

const hoverIn = () => {
  isHovering.value = true;
}

const activeIn = () => {
  isActive.value = true;
}

const mouseUpHandler = () => {
  isActive.value = false;
}

const emit = defineEmits(['click']);

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<style scoped>
.custom-button {
  height: 100%;
  box-sizing: border-box;
  user-select: none;
}

.content {
  height: 100%;
  display: flex;
  align-items: center;
}

.content-left {
  justify-content: flex-start;
}

.content-center {
  justify-content: center;
}

.content-right {
  justify-content: flex-end;
}

.button-icon {
  width: auto;
  height: 100%;
}

.button-text {
  white-space: nowrap;
}
</style>