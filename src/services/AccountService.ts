import axios, {AxiosError} from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from './responses/ErrorResponse'

export interface RegisterRequest {
    username: string
    password: string
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

export const AccountService = {
    async register(request: RegisterRequest): Promise<void> {
        try {
            await apiClient.post('/auth/register', {
                username: request.username,
                password: request.password
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                if (axiosError.response) {
                    const data = axiosError.response.data as ErrorResponse
                    console.error(data)
                } else {
                    console.error('Ошибка при регистрации')
                }
            } else {
                console.error('Непредвиденная ошибка')
            }
            throw error
        }
    },
    async getMe(): Promise<GetMeResponse> {
        const tokenStore = useTokensStore()
        if (tokenStore.accessToken == null) {
            await tokenStore.refresh()
        }
        const accessToken = tokenStore.accessToken
        try {
            const response = await apiClient.get('/auth/accounts/me', {
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
                    console.error('Ошибка при запросе своего аккаунта')
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
