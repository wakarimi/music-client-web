import axios, { AxiosError } from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from "@/services/responses/ErrorResponse";

export interface AlbumGetAllItem {
  albumId: number
  title: string
}

export interface AlbumGetAll {
  albums: AlbumGetAllItem[]
}

export interface AlbumGet {
  albumId: number
  title: string
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

export const AlbumService = {
  async getAlbums(): Promise<AlbumGetAll> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get('/metadata/albums', {
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
          console.error('Ошибка при запросе альбомов')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
  async getAlbum(albumId: number): Promise<AlbumGet> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get(`/metadata/albums/${albumId}`, {
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
          console.error('Ошибка при запросе альбома')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
}

