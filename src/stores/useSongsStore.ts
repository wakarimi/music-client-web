import { defineStore } from 'pinia'
import { SongService } from '@/services/SongService'
import type { SongGetAllItem } from '@/services/SongService'

export const useSongsStore = defineStore('songs', {
  state: () => ({
    allSongs: [] as SongGetAllItem[]
  }),
  actions: {
    async fetchSongs() {
      this.allSongs = (await SongService.getSongs()).songs
    }
  }
})
