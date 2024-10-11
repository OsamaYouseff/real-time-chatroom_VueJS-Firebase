import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '../views/Chatroom.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ErrorPage from '../views/ErrorPage.vue'


import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;

  if (!user) next({ name: 'LoginPage' })
  else next()

}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Chatroom',
      component: Chatroom,
      beforeEnter: requireAuth
    }, {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,

    }, {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage

    },
    {
      path: '/:catchAll(.*)',
      name: 'ErrorPage',
      component: ErrorPage
    },

  ]
})

export default router
