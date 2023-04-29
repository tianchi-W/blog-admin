<template>
  <div class="container">article</div>
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
