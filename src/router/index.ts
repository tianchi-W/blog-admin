import { createRouter, createWebHistory, type RouteRecord, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Index from '@/layouts/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '/', name: 'home', component: HomeView },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/UsersView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ] as RouteRecordRaw[]
})

export default router
