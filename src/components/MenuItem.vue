<template>
  <template v-for="menu in menuList" :key="menu.path">
    <!-- 有子级 -->
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <component
          :is="menu.meta.icon"
          style="width: 16px; height: 16px; margin-right: 20px"
        ></component>
        <span>{{ menu.meta.title }}</span>
      </template>
      <!-- 如果有三级菜单可以递归 -->
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <!-- 使用icon动态加载-->
      <component
        :is="menu.meta.icon"
        style="width: 16px; height: 16px; margin-right: 20px"
      ></component>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
// 接收父组件传入的数据
defineProps(['menuList'])
</script>
<style lang="scss" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
