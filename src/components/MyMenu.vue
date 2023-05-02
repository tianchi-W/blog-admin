<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
    style="height: 100%"
  >
    <el-menu-item v-for="item in routes" :key="item.name" :index="item.name">
      <el-icon><setting /></el-icon>
      <template #title>
        <span style="width: 200px">{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { routes } from '@/router/routes'
import { Document, Menu as IconMenu, Location, Setting, House } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log(router)

defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (key: string, keyPath: string[]) => {
  router.push({ name: key })
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 100vh;
}
</style>
