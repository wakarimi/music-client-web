import { defineStore } from 'pinia'
import { TokenService } from '@/services/TokenService'

export const useTokensStore = defineStore('tokens', {
  state: () => ({
    refreshToken: null as string | null,
    accessToken: null as string | null
  }),
  actions: {
    async login(username: string, password: string) {
      const tokens = await TokenService.login({
        username: username,
        password: password
      })
      this.refreshToken = tokens.refreshToken
      this.accessToken = tokens.accessToken
      localStorage.setItem('refreshToken', this.refreshToken)
    }
  }
})
