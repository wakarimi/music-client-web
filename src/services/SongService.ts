import axios, {AxiosError} from "axios";
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from "@/services/responses/ErrorResponse";

export interface Song {
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

export interface SongGetAll {
    songs: Song[];
}

export interface SongGetByAlbum {
    songs: Song[];
}

export interface SongGetByArtist {
    songs: Song[];
}

export interface SongGetByGenre {
    songs: Song[];
}

const apiClient = axios.create({
    baseURL: "http://localhost:8021/api",
});

apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const tokenStore = useTokensStore();
            await tokenStore.refresh();
            originalRequest.headers['Authorization'] = `Bearer ${tokenStore.accessToken}`;
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const SongService = {
    async getAllSongs(): Promise<SongGetAll> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get('/music-metadata/songs', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при запросе всех песен')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async getSongsByAlbum(albumId: number): Promise<SongGetByAlbum> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get(`/music-metadata/albums/${albumId}/songs`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при запросе песен альбома')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async getSongsByArtist(artistId: number): Promise<SongGetByArtist> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get(`/music-metadata/artists/${artistId}/songs`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при запросе песен исполнителя')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async getSongsByGenre(genreId: number): Promise<SongGetByGenre> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get(`/music-metadata/genres/${genreId}/songs`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при запросе песен жанра')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
};