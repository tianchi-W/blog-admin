<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col class="flex-center" :span="4"
        ><div class="grid-content ep-bg-purple">
          <el-icon><Operation /></el-icon></div
      ></el-col>
      <el-col :span="16"
        ><div class="grid-content ep-bg-purple">{{ count }}{{ doubleCount }}</div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content ep-bg-purple">
          <el-avatar class="avatar" :icon="UserFilled" @click="login" />
          <span style="margin-left: 20px">{{ isLogin ? userName : '请登录' }}</span>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, toRaw } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
import { useCommonStore } from '@/stores/common'
import router from '@/router/index'
import { storeToRefs } from 'pinia'
const { count, doubleCount } = storeToRefs(useCounterStore())
const { loginOut, handleLogin } = useCommonStore()
const { isLogin, userName } = storeToRefs(useCommonStore())
const login = () => {
  isLogin.value ? loginOut() : router.push({ name: 'login' })
}
const emits = defineEmits([])
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped>
.container {
}
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
</style>
