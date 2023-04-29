import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

interface IPermissionStore {
  authRoutes: RouteRecordRaw[]
}
