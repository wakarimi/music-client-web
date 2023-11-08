import { defineStore } from 'pinia';
import type {Directory, DirectoryContent, DirectoryOne} from "@/services/DirService";
import {DirService} from "@/services/DirService";

export const useDirsStore = defineStore('dirs', {
    state: () => ({
        rootDirs: null as Directory[] | null,
        dirContent: new Map<number, DirectoryContent>,
        dir: new Map<number, DirectoryOne>
    }),
    actions: {
        async fetchDir(dirId: number) {
            this.dir.set(dirId, await DirService.getDir(dirId));
        },
        async fetchRootDirs() {
            this.rootDirs = (await DirService.getRootDirs()).dirs;
        },
        async fetchDirContent(dirId: number){
            this.dirContent.set(dirId, await DirService.getDirContent(dirId))
        },
    },
});
