<template>
  <div class="files-panel">
    <CustomHeader
        class="header"
    >

      <template #left>
        <div
            class="header-path header-element"
            v-for="(pathItem, index) in pathItems"
            :key="index"
        >
          <CustomButton
              class="header-path-element"
              text-size="14px"
              :button-text="pathItem.name"
              :size-change-percent="2"
              button-padding="3px"
              @click="changeDirectory(pathItem.dirId)"
          />
          <span
              class="path-item-separator"
              v-if="index < pathItems.length - 1">
            /
          </span>
        </div>
      </template>

      <template #right>
        <CustomTextField
            v-model="filterText"
            class="filter-field header-element"
            placeholder-text="Фильтр"
            text-size="14px"
        />
        <CustomButton
            :button-icon="addIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handleAddAllFilesClick"
        />
        <CustomButton
            :button-icon="playIcon"
            :size-change-percent="2"
            button-padding="4px"
            class="control-button header-element"
            @click="handlePlayAllFilesClick"
        />
      </template>
    </CustomHeader>

    <div class="file-grid">
      <CustomCard
          v-for="dir in currentDirId == null ? rootDirs : currentDirs"
          :key="dir.dirId"
          :card-text="currentDirId == null ? getLastPartOfAbsolutePath(dir.name) : dir.name"
          :content-id="dir.dirId"
          class="grid-item"
          content-type="directory"
          @addClick="handleAddClick"
          @cardClick="changeDirectory(dir.dirId)"
          @playClick="handlePlayClick"
      />

      <CustomCard
          v-for="audioFile in currentAudioFiles"
          :key="audioFile.audioFileId"
          :card-text="audioFile.filename"
          :content-id="audioFile.audioFileId"
          class="grid-item"
          content-type="audioFile"
          @addClick="handleAddClick"
          @playClick="handlePlayClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useDirsStore} from '@/stores/useDirsStore'
import {onMounted, ref, watch} from 'vue'
import type {AudioFile, Directory} from '@/services/DirService'
import CustomCard from "@/components/base/CustomCard.vue";
import CustomHeader from "@/components/base/CustomHeader.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";
import CustomButton from "@/components/base/CustomButton.vue";
import CustomTextField from "@/components/base/CustomTextField.vue";

const dirStore = useDirsStore()

let currentDirId = ref<number | null>(null)
let rootDirs = ref<Directory[]>([])
let currentDirs = ref<Directory[]>([])
let currentAudioFiles = ref<AudioFile[]>([])

const pathItems = ref([{name: 'Файлы', dirId: 0}])

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
        pathItems.value.push({name: getLastPartOfAbsolutePath(dir.name), dirId: dirId})
      } else {
        pathItems.value.push({name: dir.name, dirId: dirId})
      }
    } else {
      pathItems.value.push({name: '???', dirId: dirId})
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

.files-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  flex-shrink: 0;
  height: 30px;
}

.header-path {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
}

.header-element {
  height: 30px;
}

.control-button {
  width: 30px;
}

.filter-field {
  width: 200px;
}

.file-grid {
  flex-grow: 1;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 2vh;
  padding: 10px;

  overflow-x: hidden;
}
</style>

