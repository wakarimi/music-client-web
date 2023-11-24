import {defineStore} from 'pinia'
import type {DirectoryContent, DirectoryOne, RootDirsGetAll} from '@/services/DirService'
import {DirService} from '@/services/DirService'

export const useDirsStore = defineStore('dirs', {
    state: () => ({
        _rootDirs: null as RootDirsGetAll | null,
        _isFetchRootDirsActive: false,
        _fetchRootDirsPromise: null as Promise<void> | null,

        _dirContent: new Map<number, DirectoryContent>(),
        _dir: new Map<number, DirectoryOne>(),
    }),
    actions: {
        async fetchRootDirs() {
            if (this._isFetchRootDirsActive) {
                return this._fetchRootDirsPromise;
            }
            this._isFetchRootDirsActive = true;

            this._fetchRootDirsPromise = DirService.getRootDirs().then(rootDirs => {
                this._rootDirs = rootDirs;
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchRootDirsActive = false;
                this._fetchRootDirsPromise = null;
            })
            return this._fetchRootDirsPromise
        },
        async fetchDirContent(dirId: number) {
            this._dirContent.set(dirId, await DirService.getDirContent(dirId))
        },
        async fetchDir(dirId: number) {
            this._dir.set(dirId, await DirService.getDir(dirId))
        },
    },
    getters: {
        getRootDirs: (state) => {
            if (state._rootDirs) {
                return state._rootDirs.dirs
            } else {
                return null
            }
        },
        getDirContent: (state) => {
            return (dirId: number) => {
                if (state._dirContent.has(dirId)) {
                    return state._dirContent.get(dirId)
                } else {
                    return null
                }
            }
        },
        getDir: (state) => {
            return (dirId: number) => {
                if (state._dir.has(dirId)) {
                    return state._dir.get(dirId)
                } else {
                    return null
                }
            }
        },
    },
})
