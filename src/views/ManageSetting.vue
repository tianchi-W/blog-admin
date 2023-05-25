<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    123
  </el-card>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive } from 'vue'
const emits = defineEmits([])
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped></style>
