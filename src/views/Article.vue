<template>
  <el-card v-if="$route.meta.showFator" class="box-card">
    <template #header>
      <div class="card-header">
        <span>文章管理</span>
      </div>
    </template>
    <el-button
      style="margin-bottom: 30px"
      type="primary"
      @click="$router.push({ name: 'addArticle' })"
    >
      <el-icon style="margin-right: 10px">
        <document />
      </el-icon>
      新增文章</el-button
    >
    <el-table :key="isChange" :data="articleList" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="body" label="内容" />
      <el-table-column prop="introduction" label="简介" width="180" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scoped">
          <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            @cancel="cancelEvent"
            @confirm="handleClick(scoped)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import { getArticleList, delArticle } from '@/request/api'
import { Document, Menu as IconMenu, Location, Setting, House } from '@element-plus/icons-vue'
// const data = reactive({
//   list: []
// })
let listInfo = await getArticleList()
console.log(listInfo, 'listInfo')
const articleList = computed(() => {
  return [...listInfo.data]
})

const isChange = ref(true)
const handleClick = async (scoped) => {
  delArticle({ _id: scoped.row._id })
  listInfo = await getArticleList()
  isChange.value = !isChange.value
}
watch(articleList, async () => {
  console.log(1)
  await getArticleList()
})
const cancelEvent = () => {
  console.log('cancel')
}
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
