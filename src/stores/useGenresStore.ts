import {defineStore} from 'pinia'
import type {GenresGetAll} from '@/services/GenreService'
import {GenreService} from '@/services/GenreService'

export const useGenresStore = defineStore('genres', {
    state: () => ({
        _allGenres: null as GenresGetAll | null,
        _isFetchGenresActive: false,
        _fetchGenresPromise: null as Promise<void> | null
    }),
    actions: {
        async fetchGenres() {
            if (this._isFetchGenresActive) {
                return this._fetchGenresPromise;
            }
            this._isFetchGenresActive = true;

            this._fetchGenresPromise = GenreService.getGenres().then(allGenres => {
                this._allGenres = allGenres;
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchGenresActive = false;
                this._fetchGenresPromise = null;
            })
            return this._fetchGenresPromise
        },
    },
    getters: {
        getAllGenres: (state) => {
            if (state._allGenres) {
                return state._allGenres.genres
            } else {
                return null
            }
        },
        getGenreById: (state) => {
            return (genreId: number) => {
                if (state._allGenres) {
                    return state._allGenres.genres.find(
                        genre => genre.genreId === genreId
                    ) || null
                } else {
                    return null
                }
            }
        },
    }
})
