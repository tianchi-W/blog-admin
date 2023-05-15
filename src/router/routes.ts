export const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页', showHeader: true },
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
    path: 'article',
    name: 'article',
    meta: {
      title: '文章管理',
      showFator: true
    },
    component: () => import('@/views/Article.vue'),
    children: [
      {
        path: 'add',
        name: 'addArticle',
        component: () => import('@/views/AddArticle.vue'),
        meta: { showFator: false, title: '新增文章' }
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      title: '标签管理',
      icon: 'tag'
    },
    component: () => import('@/views/Tag.vue')
  },

  {
    path: '/classify',
    name: 'classify',
    meta: {
      title: '分类管理',
      icon: 'classify'
    },
    component: () => import('@/views/classify.vue')
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
