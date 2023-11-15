import axios from 'axios'

export interface AlbumGetAll {
  albumId: number
  title: string
  bestCovers: number[] | null
}

export interface AlbumGet {
  albumId: number
  title: string
  bestCovers: number[] | null
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8023/api'
})

export const AlbumService = {
  async getAlbums(): Promise<AlbumGetAll[]> {
    const response = await apiClient.get('/albums?bestCovers=1')
    return response.data as AlbumGetAll[]
  },
  // Добавьте другие методы для работы с альбомами, например:
  async getAlbum(id: number): Promise<AlbumGet> {
    const response = await apiClient.get(`/albums/${id}?bestCovers=1`)
    return response.data
  }
  // И так далее для других CRUD операций
}

