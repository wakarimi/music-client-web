import { defineStore } from 'pinia'
import { CoverService } from '@/services/CoverService'

export const useCoversStore = defineStore('covers', {
    state: () => ({
        coverByAlbumId:  new Map<number, number[]>(),
    }),
    actions: {
        async fetchAlbumCovers(albumId: number) {
            this.coverByAlbumId.set(albumId, await CoverService.getAlbumCovers(albumId))
        },
    }
})
