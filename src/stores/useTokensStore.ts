import { defineStore } from 'pinia'
import { TokenService } from '@/services/TokenService'

export const useTokensStore = defineStore('tokens', {
  state: () => ({
    accessToken: null as string | null,
    isRefreshing: false,
    refreshPromise: null as Promise<void> | null,
  }),
  actions: {
    async login(username: string, password: string) {
      const tokens = await TokenService.login({
        username: username,
        password: password
      })
      this.accessToken = tokens.accessToken
      localStorage.setItem('refreshToken', tokens.refreshToken)
    },
    async refresh() {
      if (this.isRefreshing) {
        return this.refreshPromise;
      }
      this.isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        this.refreshPromise = TokenService.refresh({
          refreshToken: refreshToken ? refreshToken : ""
        }).then(tokens => {
          this.accessToken = tokens.accessToken
          localStorage.setItem('refreshToken', tokens.refreshToken)
        });

        await this.refreshPromise;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    },
    async logout() {
      this.accessToken = null
      localStorage.removeItem('refreshToken')
    },
  }
})
