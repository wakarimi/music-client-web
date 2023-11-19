import { defineStore } from 'pinia'
import { CoverService } from '@/services/CoverService'

export const useCoversStore = defineStore('covers', {
    state: () => ({
        coverByAlbumId:  new Map<number, number[]>(),
        coverByArtistId:  new Map<number, number[]>(),
        coverByGenreId:  new Map<number, number[]>(),
    }),
    actions: {
        async fetchAlbumCovers(albumId: number) {
            this.coverByAlbumId.set(albumId, await CoverService.getAlbumCovers(albumId))
        },
        async fetchArtistCovers(artistId: number) {
            this.coverByArtistId.set(artistId, await CoverService.getArtistCovers(artistId))
        },
        async fetchGenreCovers(genreId: number) {
            this.coverByGenreId.set(genreId, await CoverService.getGenreCovers(genreId))
        },
    }
})
