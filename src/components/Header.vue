<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col class="flex-center" :span="1"
        ><div class="grid-content ep-bg-purple" style="cursor: pointer" @click="handleIsCollapse">
          <el-icon><Operation /></el-icon></div
      ></el-col>
      <el-col :span="17"
        ><div style="height: 100%" class="grid-content a-avatar ep-bg-purple">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item
              v-for="item in pathList"
              :key="item.path"
              :to="{ name: item.name }"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content a-avatar ep-bg-purple">
          <el-popconfirm @confirm="login" :title="isLogin ? '确认要退出吗' : '请登录'">
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
import { ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { ArrowRight } from '@element-plus/icons-vue'
import router from '@/router/index'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
const pathList = ref(useRoute().matched)
onBeforeRouteUpdate((to, from) => {
  pathList.value = to.matched
})
import { storeToRefs } from 'pinia'
const { loginOut, handleIsCollapse } = useCommonStore()
const { isLogin, userName, avatar } = storeToRefs(useCommonStore())
const login = () => {
  console.log('fkdl')
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
