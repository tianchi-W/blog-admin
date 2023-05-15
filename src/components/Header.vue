<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col class="flex-center" :span="4"
        ><div class="grid-content ep-bg-purple" style="cursor: pointer" @click="handleIsCollapse">
          <el-icon><Operation /></el-icon></div
      ></el-col>
      <el-col :span="14"><div class="grid-content ep-bg-purple"></div> </el-col>
      <el-col :span="6"
        ><div class="grid-content a-avatar ep-bg-purple">
          <el-popconfirm @click="login" title="确认要退出登录吗">
            <template #reference>
              <el-avatar class="avatar" :src="avatar" />
            </template>
          </el-popconfirm>

          <span style="margin-left: 20px">{{ isLogin ? userName : '请登录' }}</span>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { useCommonStore } from '@/stores/common'
import router from '@/router/index'
import { storeToRefs } from 'pinia'
const { loginOut, handleIsCollapse } = useCommonStore()
const { isLogin, userName, avatar } = storeToRefs(useCommonStore())
const login = () => {
  isLogin.value ? loginOut() : router.push({ name: 'login' })
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
  .avatar {
    cursor: pointer;
  }
}
.a-avatar {
  display: flex;
  align-items: center;
}
</style>
