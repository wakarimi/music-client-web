import { defineStore } from 'pinia';
import { SongService } from '@/services/SongService';
import type {SongGetAllItem} from "@/services/SongService";

export const useSongStore = defineStore('songs', {
    state: () => ({
        songs: [] as SongGetAllItem[],
    }),
    actions: {
        async fetchSongs() {
            this.songs = (await SongService.getSongs()).songs;
        },
    },
});
