import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const count = ref(0)
  const isLogin = ref(false)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
