export const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/UsersView.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理'
    },
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置'
    },
    component: () => import('@/views/Setting.vue')
  }
]
