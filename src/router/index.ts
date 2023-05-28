import { createRouter, createWebHistory, type RouteRecord, type RouteRecordRaw } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import Common from '@/layouts/common.vue'
import pinia from '@/stores/store'
import { storeToRefs } from 'pinia'
import { close, start } from '@/utils/nprogress'
// import UsersPermission from '@/views/user/UsersPermission.vue'
// import UsersRoles from '@/views/user/UsersRoles.vue'
// import ArticleList from '@/views/article/ArticleList.vue'
// import ManageSetting from '@/views/ManageSetting.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/blog',
      name: 'forntend',
      component: () => import('@/layouts/forntend.vue'),
      meta: { title: '前台' }
    },

    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: Common,
      meta: { title: '首页' },
      children: [
        {
          path: '/home',
          meta: { title: '首页', icon: 'House' },
          component: () => import('@/views/HomeView.vue')
        }
      ]
    },
    {
      path: '/forntend',
      name: 'forntend',
      component: () => import('@/layouts/forntend.vue'),
      meta: { title: '前台' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/UserLogin.vue')
    },

    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ] as RouteRecordRaw[]
})
//登录管理

let isAddRoute = false
router.beforeEach((to, from, next) => {
  start()
  console.log('addaddqqq')
  const { isLogin, menuList } = storeToRefs(useCommonStore(pinia)) // 这里一定要把 pinia传入进去 持久化储存必须放在路由狗子里
  if (!isAddRoute && isLogin.value) {
    console.log('addadd')
    menuList.value.forEach((element) => {
      router.addRoute('index', element)
    })
    console.log('addaddccc')
    router.addRoute('index', menuList.value[0])
    next({ ...to, replace: true })
    isAddRoute = true
    router.addRoute({
      path: '/:pathMatch(.*)',
      redirect: '/404',
      name: 'Not'
    })
    console.log('addadd')
  }
  next()
  // next()
  //路由登录白名单
  if (to.path == '/home') {
    console.log('isAdd')
    !isLogin.value && next({ path: '/login' })
    if (isLogin.value) {
      console.log('isAdd')

      console.log('isAdd')
      next()
    }
  }
  next()
})

// 判断是否是要展示面包屑的路由

router.afterEach((to: any, from) => {
  close()
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
