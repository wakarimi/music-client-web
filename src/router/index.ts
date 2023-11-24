import {createRouter, createWebHistory} from 'vue-router'
import MusicPlayer from '@/views/MusicPlayer.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/music',
            name: 'music',
            component: MusicPlayer
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        }
    ]
})

function isTokenExpired(token: string): boolean {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const payload = JSON.parse(atob(base64)) as { expiryAt: number }

        const expiry = payload.expiryAt
        const now = Math.floor(Date.now() / 1000)

        return now > expiry
    } catch (e) {
        console.error('Ошибка при обработке токена', e)
        return true
    }
}

function isTokenUpToDate(token: string | null): boolean {
    return token !== null && !isTokenExpired(token)
}

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('refreshToken')

    if (!isTokenUpToDate(token) && to.name !== 'login' && to.name !== 'register') {
        next({name: 'login'})
    } else {
        next()
    }
})

export default router
