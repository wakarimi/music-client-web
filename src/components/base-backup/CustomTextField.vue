<template>
  <div class="custom-text-field">
    <input
        :placeholder="placeholderText"
        :readonly="isReadonly"
        :style="[{fontSize: textSize}]"
        :type="type"
        :value="modelValue"
        class="input"
        @input="handleInput($event)"
    >
  </div>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
  },
  placeholderText: {
    type: String,
  },
  textSize: {
    type: String,
    default: "18px",
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue']);

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
}
</script>

<style scoped>
.custom-text-field {
  width: 100%;
  height: 100%;
}

.input {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  color: #252323;
  user-select: none;

  background-color: #FFFFFF;
  border-color: #EBE3DB;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  outline: none;

  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.input:focus,
.input:hover,
.input:active {
  border-color: #EBE3DB;

  transform: scale(1.015);
  box-shadow: 1px 1px 2px #25232344
}
</style>