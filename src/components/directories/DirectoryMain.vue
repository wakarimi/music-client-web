<template>
  <div class="container">

    <DirectoryHeader>
    </DirectoryHeader>

    <div class="panel">
      <DirectoryCardDirectory
        v-for="dir in currentDirId == null ? rootDirs : currentDirs"
        :key="dir.dirId"
        :button-text="getLastPartOfAbsolutePath(dir.name)"
        :attachedDirId="dir.dirId"
        @changeDirectory="changeDirectory"
      >

      </DirectoryCardDirectory>
    </div>

  </div>
</template>

<script setup lang="ts">
import DirectoryCardDirectory from "@/components/directories/DirectoryCardDirectory.vue";
import DirectoryHeader from "@/components/directories/DirectoryHeader.vue";
import {useDirsStore} from "@/stores/useDirStore";
import {onMounted, ref, watch} from "vue";
import type {Directory} from "@/services/DirService";

const dirStore = useDirsStore();

let currentDirId = ref<number | null>(null);
let rootDirs = ref<Directory[]>([]);
let currentDirs = ref<Directory[]>([]);

onMounted(async () => {
  await dirStore.fetchRootDirs();
});

watch(() => dirStore.rootDirs, (newDirs) => {
  if (newDirs) {
    rootDirs.value = newDirs;
  } else {
    rootDirs.value = [];
  }
}, {
  immediate: true
});

async function changeDirectory(dirId: number) {
  currentDirId.value = dirId
  if (!dirStore.dirContent.has(dirId)) {
    await dirStore.fetchDirContent(dirId)
  }
  const dirContent = dirStore.dirContent.get(dirId);
  if (dirContent) {
    currentDirs.value = dirContent.dirs;
  } else {
    currentDirs.value = [];
  }
}

function getLastPartOfAbsolutePath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1] || path;
}

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: row;
  background-color: #412e45;
}

.panel {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
}
</style>