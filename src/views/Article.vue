<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>文章管理</span>
      </div>
    </template>
    <div v-for="o in articleList" :key="o._id" class="text item">{{ o.title }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { getArticleList } from '@/request/api'
const articleList = reactive(await getArticleList()).data
console.log(articleList)
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
