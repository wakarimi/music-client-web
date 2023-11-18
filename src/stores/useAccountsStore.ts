import { defineStore } from 'pinia'
import {AccountService } from "@/services/AccountService";
import type { GetMeResponse } from '@/services/AccountService'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    myAccount: null as GetMeResponse | null,
  }),
  actions: {
    async fetchMe() {
      this.myAccount = await AccountService.getMe()
    },
    async logout() {
      this.myAccount = null
    },
  }
})
