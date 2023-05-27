import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index'
export const useCounterStore = defineStore('roles', {
  state: () => ({}),
  getters: {},

  // actions
  actions: {
    async getData() {}
  }
})
