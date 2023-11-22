import { defineStore } from 'pinia'
import {SongService} from '@/services/SongService'
import type {SongGetAll, SongGetByAlbum} from '@/services/SongService'

export const useSongsStore = defineStore('songs', {
  state: () => ({
    _allSongs: null as SongGetAll | null,
    _isFetchSongsActive: false,
    _fetchSongsPromise: null as Promise<void> | null,

    _songsByAlbumId: new Map<number, SongGetByAlbum>,
    _isFetchAlbumSongsActive: false,
    _fetchAlbumSongsPromise: null as Promise<void> | null,
  }),
  actions: {
    async fetchAllSongs() {
      if (this._isFetchSongsActive) {
        return this._fetchSongsPromise;
      }
      this._isFetchSongsActive = true

      this._fetchSongsPromise = SongService.getAllSongs().then(allSongs => {
        this._allSongs = allSongs
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this._isFetchSongsActive = false;
        this._fetchSongsPromise = null;
      })
    },
    async fetchAlbum(albumId: number) {
      if (this._isFetchAlbumSongsActive) {
        return this._fetchAlbumSongsPromise;
      }
      this._isFetchAlbumSongsActive = true

      this._fetchAlbumSongsPromise = SongService.getSongsByAlbum(albumId).then(songsByAlbumId => {
        this._songsByAlbumId.set(albumId, songsByAlbumId)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this._isFetchAlbumSongsActive = false;
        this._fetchAlbumSongsPromise = null;
      })
    }
  },
  getters: {
    getSong: (state => {
      return (songId: number) => {
        if (state._allSongs) {
          return state._allSongs.songs.find(
              song => song.songId === songId
          ) || null
        } else {
          return null
        }
      }
    }),
    getAllSongs: (state => {
      if (state._allSongs) {
        return state._allSongs.songs
      } else {
        return null
      }
    }),
    getSongsByAlbumId: (state => {
      return (albumId: number) => {
        const albumSongs = state._songsByAlbumId.get(albumId);
        if (albumSongs) {
          return albumSongs.songs;
        } else {
          return null;
        }
      }
    }),
  }
})
