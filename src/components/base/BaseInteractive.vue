<template>
  <div
      :style="currentStyle"
      class="base-interactive"
      @click="handleClick"
      @mousedown="activeIn"
      @mouseleave="mouseLeft"
      @mouseover="hoverIn"
      @mouseup="mouseUpHandler"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

const props = defineProps({
  borderRadius: {
    type: String,
    default: '10px',
  },
  borderStyle: {
    type: String,
    default: 'solid',
  },
  borderWidth: {
    type: String,
    default: '2px',
  },

  borderColor: {
    type: String,
    default: '#F0EAE4',
  },
  borderColorHover: {
    type: String,
    default: '#EBE3DB',
  },
  borderColorActive: {
    type: String,
    default: '#EBE3DB',
  },

  backgroundColor: {
    type: String,
    default: '#FAF8F6',
  },
  backgroundColorHover: {
    type: String,
    default: '#F5F1ED',
  },
  backgroundColorActive: {
    type: String,
    default: '#F5F1ED',
  },

  shadowColor: {
    type: String,
    default: '#25232344',
  },

  sizeChangePercent: {
    type: Number,
    default: 0,
  },
})

const isHovering = ref(false);
const isActive = ref(false);

const currentStyle = computed(() => {
  let scale = 1;
  let backgroundColor = props.backgroundColor;
  let borderColor = props.borderColor;
  let boxShadow = '0 0 0 #00000000';

  if (isActive.value) {
    scale = 1 - props.sizeChangePercent / 100;
    backgroundColor = props.backgroundColorActive;
    borderColor = props.borderColorActive;
    boxShadow = `${props.sizeChangePercent}px ${props.sizeChangePercent}px ${props.sizeChangePercent * 2}px ${props.shadowColor}`;
  } else if (isHovering.value) {
    scale = 1 + props.sizeChangePercent / 100;
    backgroundColor = props.backgroundColorHover;
    borderColor = props.borderColorHover;
    boxShadow = `${props.sizeChangePercent}px ${props.sizeChangePercent}px ${props.sizeChangePercent * 3}px ${props.shadowColor}`;
  }

  return {
    backgroundColor,
    borderColor,
    transform: `scale(${scale})`,
    boxShadow,
    borderRadius: props.borderRadius,
    borderStyle: props.borderStyle,
    borderWidth: props.borderWidth,
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
.base-interactive {
  cursor: pointer;
  outline: none;

  transition: background-color 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
</style>