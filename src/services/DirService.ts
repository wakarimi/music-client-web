import axios, {AxiosError} from 'axios'
import {useTokensStore} from "@/stores/useTokensStore";
import type {ErrorResponse} from "@/services/responses/ErrorResponse";

export interface Directory {
  dirId: number
  name: string
}

export interface AudioFile {
  audioFileId: number
  dirId: number
  filename: string
  extension: string
  sizeByte: number
  durationMs: number
  bitrateKbps: number
  sampleRateHz: number
  channelsN: number
  sha256: string
}

export interface RootDirsGetAll {
  dirs: Directory[]
}

export interface DirectoryContent {
  dirs: Directory[]
  audioFiles: AudioFile[]
}

export interface DirectoryOne {
  dirId: number
  name: string
  absolutePath: string
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

export const DirService = {
  async getRootDirs(): Promise<RootDirsGetAll> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get('/music-files/roots', {
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
          console.error('Ошибка при запросе корневых директорий')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
  async getDirContent(dirId: number): Promise<DirectoryContent> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get('/music-files/dirs/' + dirId + '/content', {
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
          console.error('Ошибка при запросе содержимого директории')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
  async getDir(dirId: number): Promise<DirectoryOne> {
    const tokenStore = useTokensStore()
    if (tokenStore.accessToken == null) {
      await tokenStore.refresh()
    }
    const accessToken = tokenStore.accessToken
    try {
      const response = await apiClient.get('/music-files/dirs/' + dirId, {
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
          console.error('Ошибка при запросе директории')
        }
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  },
}
