import { defineStore } from 'pinia'
import { login } from '@/request/api'
import storage from '@/utils/localstorage.js'
import type { RouteRecordRaw } from 'vue-router'

export const useCommonStore = defineStore('common', {
  state: () => ({
    token: '',
    userName: '',
    isLogin: false,
    isCollapse: false,
    avatar: '',
    visitedRoutes: [] as { name: string }[]
  }),
  actions: {
    handleAddVisitRoute: function (val: RouteRecordRaw) {
      // console.log(val, 'val')
      this.visitedRoutes = [...this.visitedRoutes, { name: val.meta.title }]
    },
    handleRemoveVisitRoute: function (val: { name: string }[]) {
      this.visitedRoutes = val
    },
    handleLogin: async function (ruleForm: any) {
      storage.remove('accessToken')
      const res: any = await login(ruleForm)
      if (res.code !== 200) {
        ElMessage.error('Oops, this is a error message.')
      } else {
        console.log(res.data)
        ElNotification({
          title: 'Success',
          message: '登录成功',
          type: 'success'
        })
        this.token = res.data.token
        this.isLogin = true
        this.userName = res.data.username
        this.avatar = res.data.user.avatar
      }
    },
    loginOut: function () {
      this.token = ''
      this.isLogin = false
      this.userName = ''
      this.avatar = ''
      this.visitedRoutes = []
    },
    handleIsCollapse: function () {
      console.log(this.isCollapse)
      this.isCollapse = !this.isCollapse
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'accessToken', //自定义 Key值
        storage: sessionStorage, // 选择存储方式
        paths: ['isLogin', 'userName', 'token', 'avatar', 'visitedRoutes'] // state 中的字段名，按组打包储存
        // assessToken,数据不为空时localStorage才会去存储，数据为空时，不会去存储（）
      }
    ]
  }
})
