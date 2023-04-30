<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside height="100%" width="200px"><Menu></Menu></el-aside>
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
import Menu from '@/components/Menu.vue'
import Header from '@/components/Header.vue'
import { onBeforeMount, onMounted, reactive } from 'vue'

import { getArticleList } from '@/request/api'

getArticleList().then((res: any) => {
  console.log(res)
})
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
