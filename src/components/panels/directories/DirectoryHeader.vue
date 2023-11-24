<template>
  <div class="directory-header">
    <template v-for="(pathItem, index) in pathItems" :key="pathItem.dirId">
      <DirectoryPanelPathItem
          :attached-dir-id="pathItem.dirId"
          @change-directory="emitDirectory"
      >
        <template #name>
          {{ pathItem.name }}
        </template>
      </DirectoryPanelPathItem>
      <span v-if="index < pathItems.length - 1" class="path-item-separator">/</span>
    </template>
    <div class="control-buttons">
      <button class="control-button">
        <img :src="addIcon" alt="Add"/>
      </button>
      <button class="control-button">
        <img :src="playIcon" alt="Play"/>
      </button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import DirectoryPanelPathItem from "@/components/panels/directories/DirectoryHeaderPathItem.vue";
import addIcon from "@/assets/control/add.svg"
import playIcon from "@/assets/control/play.svg"
import type {PropType} from "vue";

type PathItem = {
  name: string;
  dirId: number;
};

defineProps({
  pathItems: {
    type: Array as PropType<PathItem[]>,
    required: true
  },
});

const emit = defineEmits(['change-directory']);

function emitDirectory(dirId: number) {
  emit('change-directory', dirId);
}
</script>

<style scoped>

.directory-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  height: 30px;
  background-color: #FAF8F6;
  border-color: #EBE3DB;
  border-width: 1px;
  border-style: solid;
  padding: 10px;
}

.control-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 100%;
  margin-left: auto;
}

.control-button {
  height: 100%;
  padding: 5px;
  background-color: #F5F1ED;
  border-radius: 10px;
  border-color: #F0EAE4;
  border-style: solid;
  cursor: pointer;
  transition: transform 0.15s ease,
  box-shadow 0.15s ease,
  border-color 0.15s ease,
  background-color 0.15s ease;
}

.control-button img {
  height: 100%;
}

.control-button:hover {
  transform: scale(1.1);
  box-shadow: 1px 1px 4px #25232377;
  background-color: #F0EAE4;
  border-color: #EBE3DB;
}

.control-button:active {
  transform: scale(0.9);
  box-shadow: 0.5px 0.5px 2px #25232377;
  background-color: #F0EAE4;
  border-color: #EBE3DB;
}
</style>