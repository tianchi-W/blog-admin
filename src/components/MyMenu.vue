<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    :collapse-transition="true"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
    style="height: 100%"
  >
    <menu-item :menu-list="menuList"> </menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from '@/components/MenuItem.vue'
import { routes } from '@/router/routes'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'

const { menuList } = storeToRefs(useCommonStore())
import { useRouter } from 'vue-router'
const router = useRouter()
// console.log(router.getRoutes(), 'fkdsl')
defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})

const handleOpen = (key: string, keyPath: string[]) => {
  router.push({ path: keyPath[0] })
}
const handleClose = (key: string, keyPath: string[]) => {
  router.push({ path: keyPath[0] })
}
const handleSelect = (key: string) => {
  router.push({ path: key })
}
</script>

<style></style>
