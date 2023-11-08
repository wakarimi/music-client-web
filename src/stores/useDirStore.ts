import { defineStore } from 'pinia';
import type {Directory, DirectoryContent} from "@/services/DirService";
import {DirService} from "@/services/DirService";

export const useDirsStore = defineStore('dirs', {
    state: () => ({
        rootDirs: null as Directory[] | null,
        dirContent: new Map<number, DirectoryContent>,
    }),
    actions: {
        async fetchRootDirs() {
            this.rootDirs = (await DirService.getRootDirs()).dirs;
        },
        async fetchDirContent(dirId: number){
            this.dirContent.set(dirId, await DirService.getDirContent(dirId))
        },
    },
});
