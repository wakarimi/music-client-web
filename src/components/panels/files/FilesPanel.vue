<template>
  <div class="container">
    <DirectoryHeader :pathItems="pathItems" @changeDirectory="changeDirectory"> </DirectoryHeader>

    <div class="panel">
      <CustomCard
          class="grid-item"
          v-for="dir in currentDirId == null ? rootDirs : currentDirs"
          :key="dir.dirId"
          content-type="directory"
          :content-id="dir.dirId"
          :card-text="currentDirId == null ? getLastPartOfAbsolutePath(dir.name) : dir.name"
          @cardClick="changeDirectory(dir.dirId)"
          @addClick="handleAddClick"
          @playClick="handlePlayClick"
      />

      <CustomCard
          class="grid-item"
          v-for="audioFile in currentAudioFiles"
          :key="audioFile.audioFileId"
          content-type="audioFile"
          :content-id="audioFile.audioFileId"
          :card-text="audioFile.filename"
          @addClick="handleAddClick"
          @playClick="handlePlayClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DirectoryCardDirectory from '@/components/panels/directories/DirectoryCardDirectory.vue'
import DirectoryHeader from '@/components/panels/directories/DirectoryHeader.vue'
import { useDirsStore } from '@/stores/useDirsStore'
import { onMounted, ref, watch } from 'vue'
import type { AudioFile, Directory } from '@/services/DirService'
import DirectoryCardAudioFile from '@/components/panels/directories/DirectoryCardAudioFile.vue'
import CustomCard from "@/components/base/CustomCard.vue";

const dirStore = useDirsStore()

let currentDirId = ref<number | null>(null)
let rootDirs = ref<Directory[]>([])
let currentDirs = ref<Directory[]>([])
let currentAudioFiles = ref<AudioFile[]>([])

const pathItems = ref([{ name: 'Файлы', dirId: 0 }])

onMounted(async () => {
  await dirStore.fetchRootDirs()
})

watch(
  () => dirStore.getRootDirs,
  (newDirs) => {
    if (newDirs) {
      rootDirs.value = newDirs
    } else {
      rootDirs.value = []
    }
  },
  {
    immediate: true
  }
)

async function changeDirectory(dirId: number) {
  if (dirId == 0) {
    currentDirId.value = null
    currentAudioFiles.value = []
    pathItems.value.splice(1)
    return
  }

  if (alreadyInList(dirId)) {
    for (let i = 0; i < pathItems.value.length; ++i) {
      if (dirId == pathItems.value[i].dirId) {
        pathItems.value.splice(i + 1)
      }
    }
  } else {
    if (!dirStore.getDir(dirId)) {
      await dirStore.fetchDir(dirId)
    }

    const dir = dirStore.getDir(dirId)
    if (dir) {
      if (currentDirId.value == null) {
        pathItems.value.push({ name: getLastPartOfAbsolutePath(dir.name), dirId: dirId })
      } else {
        pathItems.value.push({ name: dir.name, dirId: dirId })
      }
    } else {
      pathItems.value.push({ name: '???', dirId: dirId })
    }
  }

  if (!dirStore.getDirContent(dirId)) {
    await dirStore.fetchDirContent(dirId)
  }
  const dirContent = dirStore.getDirContent(dirId)
  if (dirContent) {
    currentDirs.value = dirContent.dirs
    currentAudioFiles.value = dirContent.audioFiles
  } else {
    currentDirs.value = []
    currentAudioFiles.value = []
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
  const parts = path.split('/')
  return parts[parts.length - 1] || path
}

const emit = defineEmits([
  'add-click',
  'play-click',
]);

function handleAddClick(songIds: number[]) {
  emit('add-click', songIds);
}

function handlePlayClick(songIds: number[]) {
  emit('play-click', songIds);
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

