import { createRouter, createWebHistory } from "vue-router"
import MusicPlayer from "@/views/MusicPlayer.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/music",
      name: "music",
      component: MusicPlayer
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
  ]
})

function isTokenExpired(token: string): boolean {
  return true
}

function isTokenUpToDate(token: string | null): boolean {
  return token !== null && !isTokenExpired(token)
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("refreshToken");

  if (!isTokenUpToDate(token) && to.name !== "login" && to.name !== "register") {
    next({ name: "login" });
  } else {
    next();
  }
})

export default router
