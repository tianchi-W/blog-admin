<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside style="width: auto"><my-menu :isCollapse="isCollapse"></my-menu></el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <RouterView> </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import MyMenu from '@/components/MyMenu.vue'
import Header from '@/components/Header.vue'
import { ref } from 'vue'
const isCollapse = ref(false)

// const title = await fetch('http://localhost:50/api/article').then((r) => r.json())
// console.log(title)
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;
  .el-header {
    background-color: var(--el-bg-color-page);
    color: var(--el-text-color-primary);
    line-height: var(--el-header-height);
  }
}
</style>
