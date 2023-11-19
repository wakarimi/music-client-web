import axios, { AxiosError } from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type { ErrorResponse } from './responses/ErrorResponse'

export interface AlbumCoverGet {
  albumId: number
  covers: number[]
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

export const CoverService = {
  async getAlbumCovers(albumId: number): Promise<number[]> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get(`/metadata/albums/${albumId}/covers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response.data.covers
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

