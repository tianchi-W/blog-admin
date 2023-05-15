import { createRouter, createWebHistory, type RouteRecord, type RouteRecordRaw } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import Index from '@/layouts/index.vue'
import { routes } from '@/router/routes'
import pinia from '@/stores/store'
import { toRaw } from 'vue'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { title: '首页' },
      redirect: '/',
      children: routes
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
router.beforeEach((to, from, next) => {
  const { isLogin } = toRaw(useCommonStore(pinia)) // 这里一定要把 pinia传入进去 持久化储存必须放在路由狗子里
  if (to.name != 'home' && to.name != 'login') {
    if (isLogin.value) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  const { visitedRoutes } = storeToRefs(useCommonStore(pinia))
  const { handleAddVisitRoute } = useCommonStore(pinia)
  if (to.meta.showHeader) {
    return
  }
  let result = visitedRoutes.value.find((val) => {
    return val.name === to.meta.title
  })
  if (!result) {
    if (to.meta.title) {
      handleAddVisitRoute(to)
    }
  }
})

export default router
