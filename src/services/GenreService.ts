import axios, { AxiosError } from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from "@/services/responses/ErrorResponse";

export interface GenreGetAllItem {
  genreId: number
  name: string
}

export interface GenreGetAll {
  genres: GenreGetAllItem[]
}

export interface GenreGet {
  genreId: number
  name: string
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

export const GenreService = {
  async getGenres(): Promise<GenreGetAll> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get('/metadata/genres', {
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
          console.error('Ошибка при запросе жанров')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
  async getGenre(genreId: number): Promise<GenreGet> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get(`/metadata/genres/${genreId}`, {
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
          console.error('Ошибка при запросе жанра')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
}

