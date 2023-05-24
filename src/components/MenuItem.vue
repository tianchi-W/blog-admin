<template>
  <template v-for="menu in menuList" :key="menu.path">
    <!-- 有子级 -->
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <el-icon> <component :is="menu.meta.icon"> </component></el-icon>
        <span style="margin: 30px">{{ menu.meta?.title }}</span>
      </template>
      <!-- 如果有三级菜单可以递归 -->
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <!-- 使用icon动态加载-->
      <el-icon> <component :is="menu.meta.icon"> </component></el-icon>

      <template #title>
        <span style="margin: 30px">{{ menu.meta?.title }}</span>
      </template>
    </el-menu-item>
    <!-- <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item> -->
  </template>
</template>
<script setup lang="ts">
// 接收父组件传入的数据
defineProps(['menuList'])
</script>
