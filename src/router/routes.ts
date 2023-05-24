/* 
@showFator article页面中是否展示当前路由的内容
*/
export const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页', showHeader: true, icon: 'House' },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      title: '用户管理',
      icon: 'User'
    },
    component: () => import('@/views/UsersView.vue'),
    children: [
      {
        path: '/users/route',
        name: 'route',
        component: () => import('@/views/AddArticle.vue'),
        meta: { title: '路由管理', icon: 'Guide' }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理',
      showFator: true,
      icon: 'Document'
    },
    component: () => import('@/views/Article.vue'),
    children: [
      {
        path: '/article/add',
        name: 'addArticle',
        component: () => import('@/views/AddArticle.vue'),
        meta: { showFator: false, title: '新增文章', icon: 'DocumentAdd' }
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      title: '标签管理',
      icon: 'PriceTag'
    },
    component: () => import('@/views/Tag.vue')
  },

  {
    path: '/classify',
    name: 'classify',
    meta: {
      title: '分类管理',
      icon: 'View'
    },
    component: () => import('@/views/Classify.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'Setting'
    },
    component: () => import('@/views/Setting.vue')
  }
]
