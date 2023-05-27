<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>角色管理</span>
      </div></template
    >
    <el-row>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <el-table :data="rolesList" style="width: 100%">
          <el-table-column fixed prop="name" label="name" width="100" />
          <!-- <el-table-column prop="permission" label="permission" width="200" /> -->
          <el-table-column prop="permissionNames" label="permissionName" />

          <el-table-column fixed="right" label="Operations" width="100">
            <template #default>
              <el-button link type="primary" size="small">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple-light" />
        <el-form :model="form" label-width="120px">
          <el-form-item label="角色名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="权限名称">
            <el-select
              :multiple="true"
              @focus="getPerimission"
              v-model="form.permissionNames"
              placeholder="所需权限"
            >
              <el-option
                v-for="item in permission"
                :key="item._id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts" setup>
import { UseGetList } from '@/utils/hooks'
import { getRolesList, getPermissionList, addRoles } from '@/request/api'
const { list, getData } = UseGetList({ api: getRolesList })
const { list: permissionList, getData: getPermission } = UseGetList({ api: getPermissionList })
const permission = computed(() => {
  return permissionList.value?.permission
})
const getPerimission = async () => {
  await getPermission()
}
const onSubmit = async () => {
  await addRoles(form.value)
  await getData()
  form.value = {
    name: '',
    permission: [],
    permissionNames: []
  }
}
const form = ref({
  name: '',
  permission: [],
  permissionNames: []
})
const rolesList = computed(() => {
  return list.value.role
})
await getData()
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
