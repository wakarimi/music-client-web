import { defineStore } from 'pinia'
import { AlbumService } from '@/services/AlbumService'
import type { AlbumGetAll, AlbumGet } from '@/services/AlbumService'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    allAlbums: { albums: [] } as AlbumGetAll,
    albumByAlbumId: new Map<number, AlbumGet>(),
  }),
  actions: {
    async fetchAllAlbums() {
      this.allAlbums = await AlbumService.getAlbums()
    },
    async fetchAlbum(albumId: number) {
      this.albumByAlbumId.set(albumId, await AlbumService.getAlbum(albumId))
    },
  }
})
