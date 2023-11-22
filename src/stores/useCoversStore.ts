import { defineStore } from 'pinia'
import { CoverService } from '@/services/CoverService'
import {AlbumService} from "@/services/AlbumService";

export const useCoversStore = defineStore('covers', {
    state: () => ({
        _coverByAlbumId:  new Map<number, number[]>(),
        _coverByArtistId:  new Map<number, number[]>(),
        _coverByGenreId:  new Map<number, number[]>(),
        _coverIdByAudioFileId:  new Map<number, number>(),
    }),
    actions: {
        async fetchAlbumCovers(albumId: number) {
            try {
                const covers = await CoverService.getAlbumCovers(albumId)
                this._coverByAlbumId.set(albumId, covers)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchArtistCovers(artistId: number) {
            try {
                const covers = await CoverService.getArtistCovers(artistId)
                this._coverByArtistId.set(artistId, covers)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchGenreCovers(genreId: number) {
            try {
                const covers = await CoverService.getGenreCovers(genreId)
                this._coverByGenreId.set(genreId, covers)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchAudioFileCover(audioFileId: number) {
            try {
                const cover = await CoverService.getAudioFileCover(audioFileId)
                this._coverIdByAudioFileId.set(audioFileId, cover)
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters: {
        getCoverIdsByAlbumId: (state) => {
            return (albumId: number) => {
                return state._coverByAlbumId.get(albumId) || null
            }
        },
        getCoverIdsByArtistId: (state) => {
            return (artistId: number) => {
                return state._coverByArtistId.get(artistId) || null
            }
        },
        getCoverIdsByGenreId: (state) => {
            return (genreId: number) => {
                return state._coverByGenreId.get(genreId) || null
            }
        },
        getCoverIdByAudioFileId: (state) => {
            return (audioFileId: number) => {
                return state._coverIdByAudioFileId.get(audioFileId) || null
            }
        },
        getCoverByCoverId: (state) => {
            return (coverId: number) => {
                return `http://localhost:8021/api/music-files/covers/${coverId}/image`
            }
        }
    }
})
