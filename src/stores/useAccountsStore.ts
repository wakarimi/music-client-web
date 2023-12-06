import {defineStore} from 'pinia'
import type {GetMeResponse} from '@/services/AccountService'
import {AccountService} from "@/services/AccountService";

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
    },
    getters: {
        getMyAccount: (state) => {
            if (state.myAccount) {
                return state.myAccount
            } else {
                return null
            }
        },
    }
})
