<template>
  <div class="custom-button">
    <button
        :style="[buttonStyle, { padding: buttonPadding }]"
        class="button"
        @click="handleClick"
        @mousedown="activeIn"
        @mouseleave="defaultState"
        @mouseover="hoverIn"
        @mouseup="mouseUpHandler"
    >
      <div :class="contentPositionClass" class="content">
        <img
            v-if="buttonIcon"
            :src="buttonIcon"
            :style="[{borderRadius: buttonIconBorderRadius}]"
            alt="buttonIcon"
            class="button-icon"
        />
        <span
            v-if="buttonText"
            :style="[{fontSize: textSize}, {paddingLeft: IncreasedPadding}, {paddingRight: buttonPadding}]"
            class="button-text"
        >
          {{ buttonText }}
        </span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'

const props = defineProps({
  buttonText: {
    type: String
  },
  buttonIcon: {
    type: String
  },
  buttonIconBorderRadius: {
    type: String,
    default: '0px'
  },
  buttonPadding: {
    type: String,
    default: '0px',
  },
  contentPosition: {
    type: String,
    default: 'center' // left, center, right
  },
  backgroundColor: {
    type: String,
    default: '#FAF8F6'
  },
  backgroundColorHover: {
    type: String,
    default: '#F5F1ED'
  },
  backgroundColorActive: {
    type: String,
    default: '#F5F1ED'
  },
  borderColor: {
    type: String,
    default: '#F0EAE4'
  },
  borderColorHover: {
    type: String,
    default: '#EBE3DB'
  },
  borderColorActive: {
    type: String,
    default: '#EBE3DB'
  },
  textSize: {
    type: String,
    default: "18px",
  },
  textColor: {
    type: String,
    default: '#3B3B3B'
  },
  textColorHover: {
    type: String,
    default: '#252323'
  },
  textColorActive: {
    type: String,
    default: '#252323'
  },
  sizeChangePercent: {
    type: Number,
    default: 0
  },
})

const IncreasedPadding = computed(() => {
  const paddingValue = parseInt(props.buttonPadding, 10) * 1.5;
  return `${paddingValue}px`;
});


const isHovering = ref(false)

const buttonStyle = ref({
  backgroundColor: props.backgroundColor,
  borderColor: props.borderColor,
  color: props.textColor,
  transform: 'scale(1.0)',
  boxShadow: ''
})

const defaultState = () => {
  isHovering.value = false
  buttonStyle.value = {
    ...buttonStyle.value,
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    color: props.textColor,
    transform: 'scale(1.0)',
    boxShadow: ''
  }
}

const hoverIn = () => {
  isHovering.value = true
  const scaleUp = 1 + props.sizeChangePercent / 100
  buttonStyle.value = {
    ...buttonStyle.value,
    backgroundColor: props.backgroundColorHover,
    borderColor: props.borderColorHover,
    color: props.textColorHover,
    transform: `scale(${scaleUp})`,
    boxShadow: '1px 1px 3px #25232344'
  }
}

const activeIn = () => {
  const scaleDown = 1 - props.sizeChangePercent / 100
  buttonStyle.value = {
    ...buttonStyle.value,
    backgroundColor: props.backgroundColorActive,
    borderColor: props.borderColorActive,
    color: props.textColorActive,
    transform: `scale(${scaleDown})`,
    boxShadow: '1px 1px 2px #25232344'
  }
}

const mouseUpHandler = () => {
  if (isHovering.value) {
    hoverIn()
  } else {
    defaultState()
  }
}

const contentPositionClass = computed(() => ({
  'content-left': props.contentPosition === 'left',
  'content-center': props.contentPosition === 'center',
  'content-right': props.contentPosition === 'right'
}))

const emit = defineEmits(['click'])

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped>
.custom-button {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
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

.button {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  user-select: none;

  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  transition: transform 0.1s ease,
  box-shadow 0.1s ease;
}

.button-icon {
  width: auto;
  height: 100%;
}

.button-text {
  white-space: nowrap;
}
</style>

