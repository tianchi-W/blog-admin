<template>
  <div class="container">
    <h5 class="mb-2"><div></div></h5>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
    >
      <menu-item :menuList="menuList"></menu-item>
    </el-menu>
    <!-- elmenu -->
  </div>
</template>
<script lang="ts" setup>
import MenuItem from '@/components/MenuItem.vue'
import { ref, reactive } from 'vue'

//菜单数据
let menuList = reactive([
  {
    path: '/dashboard',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      roles: ['sys:manage']
    },
    children: []
  },
  {
    path: '/system',
    component: 'Layout',
    alwaysShow: true,
    name: 'system',
    meta: {
      title: '系统管理',
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
])
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #545c64;
  .mb-2 {
    padding: 10px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      height: 30px;
      background-color: #0e61b5;
      width: 100%;
    }
  }
}
</style>
