<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside width="auto"><my-menu :isCollapse="isCollapse"></my-menu></el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <visit-route />
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
import VisitRoute from '@/components/VisitRoute.vue'
import { toRefs } from 'vue'
import { useCommonStore } from '@/stores/common'
const { isCollapse } = toRefs(useCommonStore())
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
