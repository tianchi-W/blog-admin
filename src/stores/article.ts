import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import 

export const useCommonStore = defineStore('common', () => {
  const articleList = ref([])
  const isLogin = ref(false)
//   const doubleCount = computed(() => count.value * 2)
 async function increment() {
    await count.value++
  }

  return { count, doubleCount, increment }
})
