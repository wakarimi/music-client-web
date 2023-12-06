<template>
  <div class="files-panel">
    <CustomHeader
        class="header"
    >

      <template #left>
        <div
            v-for="(pathItem, index) in pathItems"
            :key="index"
            class="header-path header-element"
        >
          <CustomButton
              :button-text="pathItem.name"
              :size-change-percent="2"
              button-padding="3px"
              class="header-path-element"
              text-size="14px"
              @click="changeDirectory(pathItem.dirId)"
          />
          <span
              v-if="index < pathItems.length - 1"
              class="path-item-separator">
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
          v-for="dir in filteredDirs"
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
          v-for="audioFile in filteredAudioFiles"
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
import {computed, onMounted, ref, toRaw} from 'vue'
import type {AudioFile, Directory} from '@/services/DirService'
import CustomCard from "@/components/base-backup/CustomCard.vue";
import CustomHeader from "@/components/base-backup/CustomHeader.vue";
import addIcon from "@/assets/icons/playback-control/add.svg";
import playIcon from "@/assets/icons/playback-control/play.svg";
import CustomButton from "@/components/base-backup/CustomButton.vue";
import CustomTextField from "@/components/base-backup/CustomTextField.vue";
import {useAudioFilesStore} from "@/stores/useAudioFilesStore";
import {useSongsStore} from "@/stores/useSongsStore";

const dirStore = useDirsStore()
const audioFileStore = useAudioFilesStore()
const songStore = useSongsStore()

let currentDirId = ref<number | null>(null)
let rootDirs = ref<Directory[] | null>(null)
let currentDirs = ref<Directory[] | null>(null)
let currentAudioFiles = ref<AudioFile[] | null>(null)

const pathItems = ref([{name: 'Файлы', dirId: 0}])

const filterText = ref<string>("")

onMounted(async () => {
  rootDirs.value = dirStore.getRootDirs()
  if (!rootDirs.value) {
    await dirStore.fetchRootDirs()
    rootDirs.value = dirStore.getRootDirs()
  }
})

const filteredDirs = computed(() => {
  const dirs = currentDirId.value == null ? rootDirs : currentDirs
  if (!filterText.value) {
    if (dirs.value) {
      return dirs.value
    } else {
      return []
    }
  } else {
    if (dirs.value) {
      return toRaw(dirs.value).filter(dir => {
        return dir.name.toLowerCase().includes(filterText.value.toLowerCase())
      })
    } else {
      return []
    }
  }
});

const filteredAudioFiles = computed(() => {
  const audioFiles = currentAudioFiles
  if (!filterText.value) {
    if (audioFiles.value) {
      return audioFiles.value
    } else {
      return []
    }
  } else {
    if (audioFiles.value) {
      return toRaw(audioFiles.value).filter(audioFile => {
        return audioFile.filename.toLowerCase().includes(filterText.value.toLowerCase())
      })
    } else {
      return []
    }
  }
});

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

async function getSongIdByAudioFileId(audioFileId: number): Promise<number | null> {
  let audioFile = audioFileStore.getAudioFile(audioFileId);
  if (!audioFile) {
    await audioFileStore.fetchAllAudioFiles();
    audioFile = audioFileStore.getAudioFile(audioFileId);
    if (!audioFile) {
      return null;
    }
  }
  if (!audioFile) {
    return null;
  }

  let song = songStore.getBySha256(audioFile.sha256);
  if (!song) {
    await songStore.fetchAllSongs();
    song = songStore.getBySha256(audioFile.sha256);
  }
  if (!song) {
    return null;
  }

  return song.songId
}

async function getDirSongIds(dirId: number | null): Promise<number[]> {
  let songIds: number[] = [];
  if (dirId) {
    let dirContent = dirStore.getDirContent(dirId)
    if (!dirContent) {
      await dirStore.fetchDirContent(dirId)
      dirContent = dirStore.getDirContent(dirId)
    }
    if (dirContent) {
      for (const audioFile of dirContent.audioFiles) {
        const songId = await getSongIdByAudioFileId(audioFile.audioFileId)
        if (songId) {
          songIds.push(songId)
        }
      }
      for (const subDir of dirContent.dirs) {
        const dirsSongIds = await getDirSongIds(subDir.dirId)
        for (const dirsSongId of dirsSongIds) {
          songIds.push(dirsSongId)
        }
      }
    }
  } else {
    let rootDirs = dirStore.getRootDirs();
    if (!rootDirs) {
      await dirStore.fetchRootDirs();
      rootDirs = dirStore.getRootDirs();
    }
    if (rootDirs) {
      for (const rootDir of rootDirs) {
        const dirsSongIds = await getDirSongIds(rootDir.dirId)
        for (const dirsSongId of dirsSongIds) {
          songIds.push(dirsSongId)
        }
      }
    }
  }
  return songIds;
}

async function handleAddAllFilesClick() {
  const songIds = await getDirSongIds(currentDirId.value);
  handleAddClick(songIds)
}

async function handlePlayAllFilesClick() {
  const songIds = await getDirSongIds(currentDirId.value);
  handlePlayClick(songIds)
}

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
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 2vh;
  padding: 10px;

  overflow-x: hidden;
}
</style>

