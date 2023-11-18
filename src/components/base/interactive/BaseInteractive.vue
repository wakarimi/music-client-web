<template>
  <div class="base-interactive">
    <button
        class="button"
        :style="buttonStyle"
        @mouseover="hoverIn"
        @mouseleave="defaultState"
        @mousedown="activeIn"
        @mouseup="mouseUpHandler"
        @click="emitInteractiveClick()">
      <slot>

      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
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

const isHovering = ref(false);

const buttonStyle = ref({
  backgroundColor: props.customBackgroundColor,
  borderColor: props.customBorderColor,
  transform: "scale(1.0)",
  boxShadow: "",
});

const defaultState = () => {
  isHovering.value = false;
  buttonStyle.value = {
    ...buttonStyle.value,
    backgroundColor: props.customBackgroundColor,
    borderColor: props.customBorderColor,
    transform: "scale(1.0)",
    boxShadow: "",
  };
}

const hoverIn = () => {
  isHovering.value = true;
  const scaleUp = 1 + props.sizeChangePercent / 100;
  buttonStyle.value = {
    ...buttonStyle.value,
    transform: `scale(${scaleUp})`,
    boxShadow: "1px 1px 4px #25232377",
    backgroundColor: props.customBackgroundColorHover,
    borderColor: props.customBorderColorHover,
  };
};

const activeIn = () => {
  const scaleDown = 1 - props.sizeChangePercent / 100;
  buttonStyle.value = {
    ...buttonStyle.value,
    transform: `scale(${scaleDown})`,
    boxShadow: "1px 1px 2px #25232377",
    backgroundColor: props.customBackgroundColorActive,
    borderColor: props.customBorderColorActive,
  };
};

const mouseUpHandler = () => {
  if (isHovering.value) {
    hoverIn();
  } else {
    defaultState();
  }
};

const emit = defineEmits(["interactive-click"]);

function emitInteractiveClick() {
  emit("interactive-click");
}
</script>

<style scoped>
.button {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  transition: transform 0.15s ease,
  box-shadow 0.15s ease,
  border-color 0.15s ease,
  background-color 0.15s ease;
}

</style>