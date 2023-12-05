import axios, {AxiosError} from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from './responses/ErrorResponse'

export interface RegisterRequest {
    username: string
    password: string
}

export interface Room {
    id: number,
    ownerId: number,
    currentQueueItemId: number,
    name: string,
    playbackOrderType: string,
}

export interface GetMyRooms {
    rooms: Room[]
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

export const RoomService = {
    async getMyRooms(): Promise<GetMyRooms> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get('/music-playback/rooms/my', {
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
                    console.error('Ошибка при запросе комнат аккаунта')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async create(roomName: string): Promise<void> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.post('/music-playback/rooms', {
                name: roomName,
            }, {
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
                    console.error('Ошибка при создании комнаты')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async rename(roomId: number, roomName: string): Promise<void> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.patch(`/music-playback/rooms/${roomId}/rename`, {
                name: roomName,
            }, {
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
                    console.error('Ошибка при создании комнаты')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
}