import {defineStore} from 'pinia'
import type {SongGetAll, SongGetByAlbum, SongGetByArtist, SongGetByGenre} from '@/services/SongService'
import {SongService} from '@/services/SongService'

export const useSongsStore = defineStore('songs', {
    state: () => ({
        _allSongs: null as SongGetAll | null,
        _isFetchSongsActive: false,
        _fetchSongsPromise: null as Promise<void> | null,

        _songsByAlbumId: new Map<number, SongGetByAlbum>,
        _songsByArtistId: new Map<number, SongGetByArtist>,
        _songsByGenreId: new Map<number, SongGetByGenre>,
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
            return this._fetchSongsPromise
        },
        async fetchAlbum(albumId: number) {
            try {
                const songsByAlbumId = await SongService.getSongsByAlbum(albumId)
                this._songsByAlbumId.set(albumId, songsByAlbumId)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchArtist(artistId: number) {
            try {
                const songsByArtistId = await SongService.getSongsByArtist(artistId)
                this._songsByArtistId.set(artistId, songsByArtistId)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchGenre(genreId: number) {
            try {
                const songsByGenreId = await SongService.getSongsByGenre(genreId)
                this._songsByGenreId.set(genreId, songsByGenreId)
            } catch (error) {
                console.log(error)
            }
        },
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
        getBySha256: (state => {
            return (sha256: string) => {
                if (state._allSongs) {
                    return state._allSongs.songs.find(
                        song => song.sha256 === sha256
                    ) || null
                } else {
                    return null
                }
            }
        }),
        getAllSongs: (state => {
            return () => {
                const allSongs = state._allSongs;
                if (allSongs) {
                    return allSongs.songs;
                } else {
                    return null;
                }
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
        getSongsByArtistId: (state => {
            return (artistId: number) => {
                const artistSongs = state._songsByArtistId.get(artistId);
                if (artistSongs) {
                    return artistSongs.songs;
                } else {
                    return null;
                }
            }
        }),
        getSongsByGenreId: (state => {
            return (genreId: number) => {
                const genreSongs = state._songsByGenreId.get(genreId);
                if (genreSongs) {
                    return genreSongs.songs;
                } else {
                    return null;
                }
            }
        }),
    }
})
