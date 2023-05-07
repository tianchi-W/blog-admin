<template>
  <el-card v-if="$route.meta.showFator" class="box-card">
    <template #header>
      <div class="card-header">
        <span>文章管理</span>
        <el-select
          v-model="sortByDate"
          class="m-2"
          placeholder="排序"
          size="large"
          @change="handleSort"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
    <el-table :data="articleList" height="600" style="width: 100%">
      <!-- <el-table-column fixed prop="author" label="作者" width="150" /> -->
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column prop="introduction" label="简介" width="180" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scoped: any">
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
            @confirm="handleDel(scoped)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="prev, pager, next"
      :page-size="3"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
    />
  </el-card>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, computed, onMounted } from 'vue'
import formate from '@/utils/formate'
import { getArticleList, delArticle } from '@/request/api'
import { onBeforeRouteUpdate } from 'vue-router'
import { Document, Menu as IconMenu, Location, Setting, House } from '@element-plus/icons-vue'
enum OptionValeType {
  TIMEASC = 'ta',
  TIMEDESC = 'td',
  HOTASC = 'ha',
  HOTDESC = 'hd'
}
type OptionType = {
  value: OptionValeType
  label: string
}
const options: OptionType[] = [
  {
    value: OptionValeType.TIMEASC,
    label: '按时间升序'
  },
  {
    value: OptionValeType.TIMEDESC,
    label: '按时间降序'
  },
  {
    value: OptionValeType.HOTASC,
    label: '按热度升序'
  },
  {
    value: OptionValeType.HOTDESC,
    label: '按热度降序'
  }
]
const handleSort = (val: OptionValeType) => {
  sortByDate.value = val
  handleShow(pageSize.value, currentPage.value, sortByDate.value)
}
interface DataInfoType {
  _id: string
  date: Date
  tags: string[]
  tagId: string[]
  title: string
  content: string
  introduction: string
}
const sortByDate = ref<OptionValeType>(OptionValeType.TIMEASC)
const total = ref()
const currentPage = ref(1)
const pageSize = ref()
const handleSizeChange = (val) => {
  console.log(val, val)
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleShow(pageSize.value, currentPage.value, sortByDate.value)
}
const articleList = ref([])
const handleShow = (
  limit: number,
  currentPage: number,
  sortByDate = OptionValeType.TIMEASC
): void => {
  getArticleList({ limit, skip: pageSize.value ? limit * (currentPage - 1) : 0, sortByDate }).then(
    (r) => {
      const dataInfo = r.data.article
      total.value = r.data.total
      pageSize.value = r.data.limit
      articleList.value = dataInfo.map((element: DataInfoType) => {
        return { ...element, date: formate.formateStringToDate(element.date) }
      })
    }
  )
}
handleShow(pageSize.value, currentPage.value)
onBeforeRouteUpdate((to, from, next) => {
  handleShow(pageSize.value, currentPage.value, sortByDate.value)
  next()
})
const handleDel = async (scoped: any) => {
  delArticle({ _id: scoped.row._id })
  handleShow(pageSize.value, currentPage.value, sortByDate.value)
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
