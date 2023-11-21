import {defineStore} from 'pinia'
import {AlbumService} from '@/services/AlbumService'
import type {AlbumsGetAll} from '@/services/AlbumService'

export const useAlbumsStore = defineStore('albums', {
    state: () => ({
        _allAlbums: null as AlbumsGetAll | null,
        _isFetchAlbumsActive: false,
        _fetchAlbumsPromise: null as Promise<void> | null
    }),
    actions: {
        async fetchAlbums() {
            if (this._isFetchAlbumsActive) {
                return this._fetchAlbumsPromise;
            }
            this._isFetchAlbumsActive = true;

            this._fetchAlbumsPromise = AlbumService.getAlbums().then(allAlbums => {
                this._allAlbums = allAlbums;
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchAlbumsActive = false;
                this._fetchAlbumsPromise = null;
            })
        },
    },
    getters: {
        getAllAlbums: (state) => {
            if (state._allAlbums) {
                return state._allAlbums.albums
            } else {
                return null
            }
        },
        getAlbumById: (state) => {
            return (albumId: number) => {
                if (state._allAlbums) {
                    return state._allAlbums.albums.find(
                        album => album.albumId === albumId
                    ) || null
                } else {
                    return null
                }
            }
        },
    }
})
