import axios, { AxiosError } from 'axios'
import type { ErrorResponse } from './responses/ErrorResponse'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  refreshToken: string
  accessToken: string
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8021/api'
})

export const TokenService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      const fingerprint = result.visitorId

      const response = await apiClient.post('/auth/login', {
        username: request.username,
        password: request.password,
        fingerprint: fingerprint
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse
          alert(data.message)
          console.error(data)
        } else {
          alert('Ошибка при регистрации')
        }
      } else {
        alert('Непредвиденная ошибка')
      }
      throw error
    }
  }
}
