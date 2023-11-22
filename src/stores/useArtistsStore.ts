import { defineStore } from 'pinia'
import {ArtistService} from '@/services/ArtistService'
import type {ArtistGetAll} from '@/services/ArtistService'

export const useArtistsStore = defineStore('artists', {
    state: () => ({
        _allArtists: null as ArtistGetAll | null,
        _isFetchArtistsActive: false,
        _fetchArtistsPromise: null as Promise<void> | null,
    }),
    actions: {
        async fetchAllArtists() {
            if (this._isFetchArtistsActive) {
                return this._fetchArtistsPromise;
            }
            this._isFetchArtistsActive = true

            this._fetchArtistsPromise = ArtistService.getAllArtists().then(allArtists => {
                this._allArtists = allArtists
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchArtistsActive = false;
                this._fetchArtistsPromise = null;
            })
        },
    },
    getters: {
        getArtist: (state => {
            return (artistId: number) => {
                if (state._allArtists) {
                    return state._allArtists.artists.find(
                        artist => artist.artistId === artistId
                    ) || null
                } else {
                    return null
                }
            }
        }),
        getAllArtists: (state => {
            if (state._allArtists) {
                return state._allArtists.artists
            } else {
                return null
            }
        }),
    }
})
