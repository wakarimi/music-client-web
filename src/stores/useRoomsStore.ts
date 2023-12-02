import {defineStore} from 'pinia'
import {RoomService} from "@/services/RoomService";
import type {GetMyRooms} from "@/services/RoomService";

export const useRoomsStore = defineStore('rooms', {
    state: () => ({
        _myRooms: null as GetMyRooms | null,
        _isFetchMyRoomsActive: false,
        _fetchMyRoomsPromise: null as Promise<void> | null,
    }),
    actions: {
        async fetchMyRooms() {
            if (this._isFetchMyRoomsActive) {
                return this._fetchMyRoomsPromise;
            }
            this._isFetchMyRoomsActive = true;

            this._fetchMyRoomsPromise = RoomService.getMyRooms().then(myRooms => {
                this._myRooms = myRooms;
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this._isFetchMyRoomsActive = false;
                this._fetchMyRoomsPromise = null;
            })
            return this._fetchMyRoomsPromise
        },
        resetMyRooms() {
            this._myRooms = null;
        },
    },
    getters: {
        getMyRooms: (state) => {
            if (state._myRooms) {
                return state._myRooms.rooms
            } else {
                return null
            }
        },
    }
})
