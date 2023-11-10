import axios from "axios";

export interface SongGetAll {
    songs: SongGetAllItem[];
}

export interface SongGetAllItem {
    "songId": number,
    "audioFileId": number,
    "title": string,
    "albumId": number,
    "artistId": number,
    "genreId": number,
    "year": number,
    "songNumber": number,
    "discNumber": number,
    "lyrics": string,
    "sha256": string
}

const apiClient = axios.create({
    baseURL: "http://localhost:8023/api",
});

export const SongService = {
    async getSongs(): Promise<SongGetAll> {
        const response = await apiClient.get('/songs');
        return response.data as SongGetAll;
    },
};