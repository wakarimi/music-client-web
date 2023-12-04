import {defineStore} from 'pinia'
import {ShareCodeService} from "@/services/ShareCodeService";

export const useShareCodesStore = defineStore('shareCodes', {
    state: () => ({
        _shareCodeByRoomId: new Map<number, string>(),
    }),
    actions: {
        async generate(roomId: number) {
            try {
                const shareCode = await ShareCodeService.generate(roomId)
                this._shareCodeByRoomId.set(shareCode.roomId, shareCode.code)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchByRoomId(roomId: number) {
            try {
                const shareCode = await ShareCodeService.get(roomId)
                this._shareCodeByRoomId.set(shareCode.roomId, shareCode.code)
            } catch (error) {
                console.log(error)
            }
        },
        async delete(roomId: number) {
            try {
                console.log("aaa")
                await ShareCodeService.delete(roomId)
                this._shareCodeByRoomId.delete(roomId)
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters: {
        getShareCodeByRoomId: (state) => {
            return (roomId: number) => {
                return state._shareCodeByRoomId.get(roomId) || null
            }
        },
    },
})
