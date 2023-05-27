<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户管理</span>
      </div>
    </template>
    <el-table :data="getDate" style="width: 100%" height="700">
      <el-table-column fixed prop="username" label="姓名" width="150" />
      <el-table-column prop="createTime" label="日期" width="120" />
      <el-table-column prop="isWx" label="微信用户" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.isWx" disabled />
        </template>
      </el-table-column>
      <el-table-column label="头像" width="150">
        <template #default="{ row }">
          <img width="100" :src="row.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="200">
        <template #default="{ row }">
          <el-radio-group v-model="row.sex" size="small">
            <el-radio-button :label="0" disabled>男</el-radio-button>
            <el-radio-button :label="1" disabled>女</el-radio-button>
            <el-radio-button :label="2" disabled>自定义</el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scoped: any">
          <el-popconfirm title="Are you sure to delete this?">
            <template #reference>
              <el-button type="danger" disabled @click="console.log(scoped)">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { getUserInfoList } from '@/request/api'
import { ref } from 'vue'
const getDate = ref((await getUserInfoList()).data)
</script>

<style></style>
