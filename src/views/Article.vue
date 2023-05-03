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
    <el-table :data="articleList" height="650" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column prop="introduction" label="简介" width="180" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scoped">
          <el-button
            link
            type="primary"
            size="small"
            @click="
              $router.push({ name: 'addArticle', query: { id: scoped.row._id, type: 'detail' } })
            "
            >Detail</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="
              $router.push({ name: 'addArticle', query: { id: scoped.row._id, type: 'edit' } })
            "
            >Edit</el-button
          >
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
import { reactive, ref, watch, computed, onMounted } from 'vue'
import { getArticleList, delArticle } from '@/request/api'
import { onBeforeRouteUpdate } from 'vue-router'
import { Document, Menu as IconMenu, Location, Setting, House } from '@element-plus/icons-vue'

const articleList = ref([])
const handleShow = () => {
  getArticleList().then((r) => {
    articleList.value = r.data
  })
}
handleShow()
onBeforeRouteUpdate((to, from, next) => {
  handleShow()
  next()
})
const handleClick = async (scoped) => {
  delArticle({ _id: scoped.row._id })
  handleShow()
}

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
