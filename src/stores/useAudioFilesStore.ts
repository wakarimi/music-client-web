import { defineStore } from 'pinia'
import {AudioFileService} from '@/services/AudioFileService'
import type {AudioFileGetAll} from '@/services/AudioFileService'

export const useAudioFilesStore = defineStore('audioFiles', {
  state: () => ({
    _allAudioFiles: null as AudioFileGetAll | null,
    _isFetchAudioFilesActive: false,
    _fetchAudioFilesPromise: null as Promise<void> | null,
  }),
  actions: {
    async fetchAllAudioFiles() {
      if (this._isFetchAudioFilesActive) {
        return this._fetchAudioFilesPromise;
      }
      this._isFetchAudioFilesActive = true

      this._fetchAudioFilesPromise = AudioFileService.getAllAudioFiles().then(allAudioFiles => {
        this._allAudioFiles = allAudioFiles
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this._isFetchAudioFilesActive = false;
        this._fetchAudioFilesPromise = null;
      })
    },
  },
  getters: {
    getAudioFile: (state => {
      return (audioFileId: number) => {
        if (state._allAudioFiles) {
          return state._allAudioFiles.audioFiles.find(
              audioFile => audioFile.audioFileId === audioFileId
          ) || null
        } else {
          return null
        }
      }
    }),
    getAllAudioFiles: (state => {
      if (state._allAudioFiles) {
        return state._allAudioFiles.audioFiles
      } else {
        return null
      }
    }),
  }
})
