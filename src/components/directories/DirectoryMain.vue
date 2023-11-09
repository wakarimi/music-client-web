<template>
  <div class="container">

    <DirectoryHeader :pathItems="pathItems"
                     @changeDirectory="changeDirectory">
    </DirectoryHeader>

    <div class="panel">
      <DirectoryCardDirectory
        v-for="dir in currentDirId == null ? rootDirs : currentDirs"
        :key="dir.dirId"
        :button-text="currentDirId == null ? getLastPartOfAbsolutePath(dir.name) : dir.name"
        :attachedDirId="dir.dirId"
        @changeDirectory="changeDirectory"
      >

      </DirectoryCardDirectory>
      <DirectoryCardAudioFile
          v-for="audioFile in currentAudioFiles"
          :key="audioFile.audioFileId"
          :button-text="audioFile.filename"
          :attached-audio-file-id="audioFile.audioFileId"
      >

      </DirectoryCardAudioFile>
    </div>

  </div>
</template>

<script setup lang="ts">
import DirectoryCardDirectory from "@/components/directories/DirectoryCardDirectory.vue";
import DirectoryHeader from "@/components/directories/DirectoryHeader.vue";
import {useDirsStore} from "@/stores/useDirStore";
import {onMounted, ref, watch} from "vue";
import type {AudioFile, Directory} from "@/services/DirService";
import DirectoryCardAudioFile from "@/components/directories/DirectoryCardAudioFile.vue";

const dirStore = useDirsStore();

let currentDirId = ref<number | null>(null);
let rootDirs = ref<Directory[]>([]);
let currentDirs = ref<Directory[]>([]);
let currentAudioFiles = ref<AudioFile[]>([]);

const pathItems = ref([
  { name: 'Файлы', dirId: 0 },
]);

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
  if (dirId == 0) {
    currentDirId.value = null
    currentAudioFiles.value = [];
    pathItems.value.splice(1);
    return
  }

  if (alreadyInList(dirId)) {
    for (let i = 0; i < pathItems.value.length; ++i) {
      if (dirId == pathItems.value[i].dirId) {
        pathItems.value.splice(i + 1);
      }
    }
  } else {
    if (!dirStore.dir.has(dirId)) {
      await dirStore.fetchDir(dirId)
    }

    const dir = dirStore.dir.get(dirId);
    if (dir) {
      if (currentDirId.value == null) {
        pathItems.value.push({ name: getLastPartOfAbsolutePath(dir.name), dirId: dirId });
      } else {
        pathItems.value.push({ name: dir.name, dirId: dirId });
      }
    } else {
      pathItems.value.push({ name: '???', dirId: dirId });
    }
  }

  if (!dirStore.dirContent.has(dirId)) {
    await dirStore.fetchDirContent(dirId)
  }
  const dirContent = dirStore.dirContent.get(dirId);
  if (dirContent) {
    currentDirs.value = dirContent.dirs;
    currentAudioFiles.value = dirContent.audioFiles;
  } else {
    currentDirs.value = [];
    currentAudioFiles.value = [];
  }
  currentDirId.value = dirId
}

function alreadyInList(dirId: number): boolean {
  for (let i = 0; i < pathItems.value.length; ++i) {
    if (dirId == pathItems.value[i].dirId) {
      return true
    }
  }
  return false
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