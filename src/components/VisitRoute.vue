<template>
  <div class="container">
    <el-tag
      v-for="tag in visitedRoutes"
      :key="tag.name"
      class="mx-1"
      closable
      type="warning"
      @close="handleClose(tag)"
      style="margin-right: 20px"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
const { visitedRoutes } = storeToRefs(useCommonStore())
const { handleRemoveVisitRoute } = useCommonStore()
console.log(visitedRoutes.value, 'route')
const handleClose = (val: { name: string }[]) => {
  const routes = visitedRoutes.value.filter((item) => {
    return item.name !== val.name
  })
  handleRemoveVisitRoute(routes)
}
const emits = defineEmits([])
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
