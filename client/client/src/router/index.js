import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ChatPage from '../views/ChatPage.vue'
import GameDetail from '../views/GameDetail.vue'
import Games from '../views/Games.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/chatPage',
      name: 'chatPage',
      component: ChatPage
    },
    {
      path: '/gameDetail',
      name: 'gameDetail',
      component: GameDetail
    }
  ]
})

router.beforeEach((to, from) => {
  let access_token = localStorage.getItem('access_token') 
  if(!access_token && (to.name !== 'login' && to.name !== 'register')) {
    return {name: 'login'}
  } else if(access_token && (to.name === 'login' || to.name === 'register')) {
    return {name: 'home'}
  }
})

export default router
