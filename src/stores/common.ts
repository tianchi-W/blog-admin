import { ref, computed, reactive, toRaw } from 'vue'
import { defineStore } from 'pinia'
import storage from '@/utils/localstorage.js'
import { login } from '@/request/api'

export const useCommonStore = defineStore('common', () => {
  const state = reactive<{ token: string | null; userName: string | null; isLogin: boolean }>({
    token: storage.get('token') || '',
    userName: '',
    isLogin: false
  })
  async function handleLogin(ruleForm: any) {
    const res = await login(ruleForm)
    if (res.code !== 200) {
      ElMessage.error('Oops, this is a error message.')
    } else {
      console.log('router1')
      storage.remove('token')
      storage.set('token', res.data.token)
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success'
      })
      state.isLogin = true
    }
  }

  return { state, handleLogin }
})
