import { defineStore } from 'pinia'
import { GenreService } from '@/services/GenreService'
import type { GenreGetAll, GenreGet } from '@/services/GenreService'

export const useGenresStore = defineStore('genres', {
  state: () => ({
    allGenres: { genres: [] } as GenreGetAll,
    genreByGenreId: new Map<number, GenreGet>(),
  }),
  actions: {
    async fetchAllGenres() {
      this.allGenres = await GenreService.getGenres()
    },
    async fetchGenre(genreId: number) {
      this.genreByGenreId.set(genreId, await GenreService.getGenre(genreId))
    },
  }
})
