import { defineStore } from 'pinia'
import { login } from '@/request/api'
import storage from '@/utils/localstorage.js'

export const useCommonStore = defineStore('common', {
  state: () => ({
    token: '',
    userName: '',
    isLogin: false
  }),
  actions: {
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
      }
    },
    loginOut: function () {
      this.token = ''
      this.isLogin = false
      this.userName = ''
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'accessToken', //自定义 Key值
        storage: sessionStorage, // 选择存储方式
        paths: ['isLogin', 'userName', 'token'] // state 中的字段名，按组打包储存
        // assessToken,数据不为空时localStorage才会去存储，数据为空时，不会去存储（）
      }
    ]
  }
})
