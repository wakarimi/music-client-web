import {defineStore} from 'pinia'
import {ArtistService} from '@/services/ArtistService'
import type {ArtistsGetAll} from '@/services/ArtistService'

export const useArtistsStore = defineStore('artists', {
    state: () => ({
        _allArtists: null as ArtistsGetAll | null,
        _isFetchArtistsActive: false,
        _fetchArtistsPromise: null as Promise<void> | null
    }),
    actions: {
        async fetchArtists() {
            if (this._isFetchArtistsActive) {
                return this._fetchArtistsPromise;
            }
            this._isFetchArtistsActive = true;

            this._fetchArtistsPromise = ArtistService.getArtists().then(allArtists => {
                this._allArtists = allArtists;
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchArtistsActive = false;
                this._fetchArtistsPromise = null;
            })
        },
    },
    getters: {
        getAllArtists: (state) => {
            if (state._allArtists) {
                return state._allArtists.artists
            } else {
                return null
            }
        },
        getArtistById: (state) => {
            return (artistId: number) => {
                if (state._allArtists) {
                    return state._allArtists.artists.find(
                        artist => artist.artistId === artistId
                    ) || null
                } else {
                    return null
                }
            }
        },
    }
})
