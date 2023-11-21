import { defineStore } from 'pinia'
import { ArtistService } from '@/services/ArtistService'
import type { ArtistGetAll, ArtistGet } from '@/services/ArtistService'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    allArtists: { artists: [] } as ArtistGetAll,
    isAllArtistsFetching: false,
    allArtistsPromise: null as Promise<void> | null,

    artistByArtistId: new Map<number, ArtistGet>(),
  }),
  actions: {
    async fetchAllArtists() {
      if (this.isAllArtistsFetching) {
        return this.allArtistsPromise;
      }
      this.isAllArtistsFetching = true;

      this.allArtistsPromise = ArtistService.getArtists()
          .then(allArtists => {
            this.allArtists = allArtists;
            allArtists.artists.forEach(artist => {
              this.artistByArtistId.set(artist.artistId, artist);
            });
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.isAllArtistsFetching = false;
            this.allArtistsPromise = null;
          });
    }
  }
})
