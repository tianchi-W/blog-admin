const routes = [
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'Menu',
      roles: ['sys:manage'],
      parentId: 0
    },
    component: () => import('@/views/article.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    meta: {
      title: '标签管理',
      icon: 'Menu',
      roles: ['sys:manage'],
      parentId: 0
    },
    component: () => import('@/views/tags.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'Menu',
      roles: ['sys:manage'],
      parentId: 0
    },
    component: () => import('@/views/setting.vue')
  }
]
let menuList = [
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article.vue'),
    meta: {
      title: '文章管理',
      icon: 'Menu',
      roles: ['sys:manage'],
      parentId: 0
    },
    children: [
      {
        path: '/department',
        component: '/system/department/department',
        alwaysShow: false,
        name: 'department',
        meta: {
          title: '机构管理',
          icon: 'SetUp',
          roles: ['sys:dept'],
          parentId: 17
        }
      },
      {
        path: '/userList',
        component: '/system/User/UserList',
        alwaysShow: false,
        name: 'userList',
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
          roles: ['sys:user'],
          parentId: 17
        }
      },
      {
        path: '/roleList',
        component: '/system/Role/RoleList',
        alwaysShow: false,
        name: 'roleList',
        meta: {
          title: '角色管理',
          icon: 'Setting',
          roles: ['sys:role'],
          parentId: 17
        }
      },
      {
        path: '/menuList',
        component: '/system/Menu/MenuList',
        alwaysShow: false,
        name: 'menuList',
        meta: {
          title: '权限管理',
          icon: 'Tickets',
          roles: ['sys:menu'],
          parentId: 17
        }
      }
    ]
  },
  {
    path: '/goods',
    component: 'Layout',
    alwaysShow: true,
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: 'Shop',
      roles: ['sys:goods'],
      parentId: 0
    },
    children: [
      {
        path: '/goodCategory',
        component: '/goods/goodsCategory/goodsCategoryList',
        alwaysShow: false,
        name: 'goodCategory',
        meta: {
          title: '商品分类',
          icon: 'Van',
          roles: ['sys:goodsCategory'],
          parentId: 34
        }
      }
    ]
  },
  {
    path: '/systenConfig',
    component: 'Layout',
    alwaysShow: true,
    name: 'systenConfig',
    meta: {
      title: '系统工具',
      icon: 'Setting',
      roles: ['sys:systenConfig'],
      parentId: 0
    },
    children: [
      {
        path: '/document',
        component: '/system/config/systemDocument',
        alwaysShow: false,
        name: 'http://42.193.158.170:8089/swagger-ui/index.html',
        meta: {
          title: '接口文档',
          icon: 'Tickets',
          roles: ['sys:document'],
          parentId: 42
        }
      }
    ]
  }
]
