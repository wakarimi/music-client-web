import { defineStore } from 'pinia'
import { CoverService } from '@/services/CoverService'

export const useCoversStore = defineStore('covers', {
    state: () => ({
        _coverByAlbumId:  new Map<number, number[]>(),
        _coverByArtistId:  new Map<number, number[]>(),
        _coverByGenreId:  new Map<number, number[]>(),
    }),
    actions: {
        async fetchAlbumCovers(albumId: number) {
            this._coverByAlbumId.set(albumId, await CoverService.getAlbumCovers(albumId))
        },
        async fetchArtistCovers(artistId: number) {
            this._coverByArtistId.set(artistId, await CoverService.getArtistCovers(artistId))
        },
        async fetchGenreCovers(genreId: number) {
            this._coverByGenreId.set(genreId, await CoverService.getGenreCovers(genreId))
        },
    },
    getters: {
        getCoverIdsByAlbumId: (state) => {
            return (albumId: number) => {
                return state._coverByAlbumId.get(albumId) || null
            }
        },
        getCoverByCoverId: (state) => {
            return (coverId: number) => {
                return `http://localhost:8021/api/music-files/covers/${coverId}/image`
            }
        }
    }
})
