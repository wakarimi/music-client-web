import axios, { AxiosError } from 'axios'
import type { ErrorResponse } from './responses/ErrorResponse'

export interface RegisterRequest {
  username: string
  password: string
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8021/api'
})

export const AccountService = {
  async register(request: RegisterRequest): Promise<void> {
    try {
      await apiClient.post('/auth/register', {
        username: request.username,
        password: request.password
      })
      alert('Регистрация прошла успешно')
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
