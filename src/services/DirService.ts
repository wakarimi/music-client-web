import axios from 'axios'

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
  baseURL: 'http://localhost:8022/api'
})

export const DirService = {
  async getBestCoverForAudioFile(audioFileId: number): Promise<number> {
    const response = await apiClient.put('/audio-files/covers-top', {
      audioFiles: [audioFileId]
    })
    return response.data.coversTop[0] as number
  },
  async getDir(dirId: number): Promise<DirectoryOne> {
    const response = await apiClient.get('/dirs/' + dirId)
    return response.data as DirectoryOne
  },
  async getRootDirs(): Promise<RootDirsGetAll> {
    const response = await apiClient.get('/roots')
    return response.data as RootDirsGetAll
  },
  async getDirContent(dirId: number): Promise<DirectoryContent> {
    const response = await apiClient.get('/dirs/' + dirId + '/content')
    return response.data as DirectoryContent
  }
}

