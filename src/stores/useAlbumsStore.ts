import { defineStore } from 'pinia'
import { AlbumService } from '@/services/AlbumService'
import type { AlbumGetAll, AlbumGet } from '@/services/AlbumService'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [] as AlbumGetAll[],
    albumDetails: null as AlbumGet | null
  }),
  actions: {
    async fetchAlbums() {
      this.albums = await AlbumService.getAlbums()
    },
    async fetchAlbum(albumId: number) {
      this.albumDetails = await AlbumService.getAlbum(albumId)
    }
  }
})
