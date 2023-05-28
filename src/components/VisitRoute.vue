<template>
  <div class="container">
    <el-tag
      v-for="tag in visitedRoutes"
      :key="tag.name"
      class="mx-1"
      closable
      type="warning"
      @close="handleClose(tag)"
      @click="handleChoose(tag)"
      style="margin-right: 20px; cursor: pointer"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script lang="ts" setup>
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const { visitedRoutes } = storeToRefs(useCommonStore())
const { handleRemoveVisitRoute } = useCommonStore()
const handleClose = (val: { name: string }) => {
  const routes = visitedRoutes.value.filter((item) => {
    return item.name !== val.name
  })
  handleRemoveVisitRoute(routes)
}
const handleChoose = (tag: any) => {
  router.push({ name: tag.route.name })
}
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
