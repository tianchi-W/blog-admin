/* 
@showFator article页面中是否展示当前路由的内容
*/
export const routes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页', showHeader: true, icon: 'House', permission: ['home'] },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/users',
    name: 'users',

    meta: { title: '用户管理', icon: 'User', permission: ['users'] },
    redirect: '/users/roles',
    children: [
      {
        path: '/users/usersList',
        name: 'usersList',
        component: () => import('@/views/user/UsersView.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
          permission: ['users']
        }
      },
      {
        path: '/users/roles',
        name: 'roles',
        component: () => import('@/views/user/UsersRoles.vue'),
        meta: { title: '角色管理', icon: 'Guide', permission: ['route'] }
      },
      {
        path: '/users/permission',
        name: 'permission',
        component: () => import('@/views/user/UsersPermission.vue'),
        meta: { title: '权限管理', icon: 'Guide', permission: ['permission'] }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理',
      showFator: true,
      icon: 'Document',
      permission: ['article']
    },
    component: () => import('@/views/article/ArticleList.vue'),
    children: [
      {
        path: '/article/add',
        name: 'addArticle',
        component: () => import('@/views/article/AddArticle.vue'),
        meta: {
          showFator: false,
          title: '新增文章',
          icon: 'DocumentAdd',
          permission: ['addArticle']
        }
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      title: '标签管理',
      icon: 'PriceTag',
      permission: ['tag']
    },
    component: () => import('@/views/ArticleTag.vue')
  },

  {
    path: '/classify',
    name: 'classify',
    meta: {
      title: '分类管理',
      permission: ['classify'],
      icon: 'View'
    },
    component: () => import('@/views/Classify.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'Setting',
      permission: ['setting']
    },
    component: () => import('@/views/ManageSetting.vue')
  }
]
