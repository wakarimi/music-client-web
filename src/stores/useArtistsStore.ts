import { defineStore } from 'pinia'
import { ArtistService } from '@/services/ArtistService'
import type { ArtistGetAll, ArtistGet } from '@/services/ArtistService'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    allArtists: { artists: [] } as ArtistGetAll,
    artistByArtistId: new Map<number, ArtistGet>(),
  }),
  actions: {
    async fetchAllArtists() {
      this.allArtists = await ArtistService.getArtists()
    },
    async fetchArtist(artistId: number) {
      this.artistByArtistId.set(artistId, await ArtistService.getArtist(artistId))
    },
  }
})
