import axios, {AxiosError} from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from './responses/ErrorResponse'

export interface ShareCode {
    roomId: number
    code: string
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8021/api'
})

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

export const ShareCodeService = {
    async generate(roomId: number): Promise<ShareCode> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.post(`/music-playback/rooms/${roomId}/share-code`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при создании кода')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async get(roomId: number): Promise<ShareCode> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get(`/music-playback/rooms/${roomId}/share-code`, {
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
                    console.error('Ошибка при создании кода')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async delete(roomId: number): Promise<void> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            await apiClient.delete(`/music-playback/rooms/${roomId}/share-code`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при удалении кода')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
}

export interface GetMeResponse {
    id: number
    username: string
    roles: number[] | null
}
