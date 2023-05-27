<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>权限管理</span>
      </div></template
    >
    <el-button type="primary" @click="dialogVisible = true"> Click to open Dialog </el-button>

    <el-table :data="permission" style="width: 100%">
      <el-table-column fixed prop="name" label="name" width="200" />
      <el-table-column prop="component" label="component" width="200" />
      <el-table-column prop="path" label="path" width="200" />
      <el-table-column prop="title" label="title" width="200" />
      <el-table-column prop="redirect" label="redirect" width="200" />
      <el-table-column prop="pid" label="父级是谁" width="200">
        <template #default="{ row }">
          {{ row.pid == -1 ? '没有父级' : row.pid }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="几级菜单" width="200" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleDetail(row)">Detail</el-button>
          <el-button link type="primary" @click="handleEdit(row)" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编辑权限" width="50%" draggable>
      <el-form :model="form" label-width="200px">
        <el-form-item label="权限名">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="菜单级别">
          <el-select v-model="form.type" placeholder="选择菜单级别">
            <el-option label="一级菜单" :value="1" />
            <el-option label="二级菜单" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单父级">
          <el-select @visible-change="getPidList" v-model="form.pid" placeholder="选择菜单级别">
            <el-option
              v-for="item in getPid"
              :key="item._id"
              :label="item.name"
              :value="item.name"
            />
            <el-option v-if="getPid?.length <= 0" label="没有父级" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="菜单名">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="重定向">
          <el-input v-model="form.redirect" />
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="form.component" />
        </el-form-item>
        <el-form-item label="菜单icon">
          <el-input v-model="form.icon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import { UseGetList } from '@/utils/hooks'

import { ref, computed } from 'vue'
import { addPermission, getPermissionList, getPidByType } from '@/request/api'
const dialogVisible = ref(false)
const { list, getData } = UseGetList({ api: getPermissionList })
await getData()
const permission = computed(() => {
  return list.value.permission
})

let form = ref({
  name: '',
  type: 1,
  icon: '',
  pid: '',
  path: '',
  component: '',
  title: '',
  redirect: ''
})
const getPid = ref()
const getPidList = async () => {
  //-1找type的父级
  getPid.value = (await getPidByType({ type: form.value.type - 1 })).data.pid
}

const onSubmit = async () => {
  await addPermission(form.value)
  await getData()
  dialogVisible.value = false
  form.value = {
    name: '',
    type: 1,
    icon: '',
    pid: '',
    path: '',
    component: '',
    title: '',
    redirect: ''
  }
}
const handleDetail = (row) => {
  console.log(row, 'row')
}
const handleEdit = (row) => {
  form.value = row
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
