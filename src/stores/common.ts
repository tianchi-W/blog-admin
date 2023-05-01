import { ref, computed, reactive, toRaw } from 'vue'
import { defineStore } from 'pinia'
import storage from '@/utils/localstorage.js'
import { login } from '@/request/api'

export const useCommonStore = defineStore('common', () => {
  const state = reactive<{ token: string | null; userName: string | null; isLogin: boolean }>({
    token: '',
    userName: '',
    isLogin: false
  })
  async function handleLogin(ruleForm: any) {
    const res = await login(ruleForm)
    console.log(res)
    if (res.code !== 200) {
      ElMessage.error('Oops, this is a error message.')
    } else {
      storage.remove('token')
      storage.set('token', res.data.token)
    }
    state.token = res
  }

  return { state, handleLogin }
})
