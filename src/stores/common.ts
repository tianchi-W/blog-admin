import { defineStore } from 'pinia'
import { login, getRoleById } from '@/request/api'
import storage from '@/utils/localstorage.js'
import { UseGetList } from '@/utils/hooks'
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
export const useCommonStore = defineStore('common', {
  state: () => ({
    token: '',
    userName: '',
    isLogin: false,
    isCollapse: false,
    avatar: '',
    role: '',
    menu: '',
    permission: [] as {
      icon: String
      name: String
      path: String
      pid: String
      type: String
      _id: String
    }[],
    visitedRoutes: [] as { name: string; route?: RouteRecordRaw }[]
  }),
  getters: {
    menuList: (state) => {
      const viteComponents = import.meta.glob('../views/**/*.vue')
      const arrayToTree = (items) => {
        let res = []
        let getChildren = (res, pid) => {
          for (const i of items) {
            if (i.pid == pid) {
              const newItem = {
                name: i.name,
                path: i.path,
                meta: { title: i.title, icon: i.icon },
                component: viteComponents[i.component.replace('@/views/', '../views/')],
                children: []
              }
              res.push(newItem)
              getChildren(newItem.children, newItem.name)
            }
          }
        }
        getChildren(res, -1)
        return res
      }
      const res = arrayToTree(state.permission)
      const index = res.indexOf(res.filter((item) => item.name == 'home')[0])
      const item = res.filter((item) => item.name == 'home')[0]
      res.splice(index, 1)
      res.unshift(item)

      return res
    }
  },
  actions: {
    handleRole: async function () {
      const { list, getData } = UseGetList({ api: getRoleById, params: { _id: this.role } })
      await getData()
      this.permission = list.value.role[0].permission
    },
    //面包屑导航
    handleAddVisitRoute: function (val: RouteRecordRaw) {
      this.visitedRoutes = [...this.visitedRoutes, { name: val.meta.title, route: val }]
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
        this.role = res.data.user.role
        // console.log(res.data.user.role)
        ElNotification({
          title: 'Success',
          message: '登录成功',
          type: 'success'
        })
        await this.handleRole()
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
      this.role = ''
      this.permission = []
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
        paths: ['isLogin', 'userName', 'token', 'avatar', 'visitedRoutes', 'role', 'permission'] // state 中的字段名，按组打包储存
        // assessToken,数据不为空时localStorage才会去存储，数据为空时，不会去存储（）
      }
    ]
  }
})
