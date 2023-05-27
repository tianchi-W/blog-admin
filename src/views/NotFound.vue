<template>
  <div>
    <h4 class="err404"></h4>

    <h5><router-link :to="{ name: 'index' }" class="go-home">去首页</router-link></h5>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive } from 'vue'
const emits = defineEmits([])
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped>
.err404 {
  width: 280px;
  margin: 150px auto;
  height: 255px;
  padding: 180px 0 0 420px;
  background: url(../../static/404_bg.png) no-repeat 0 0;
}

h4 {
  font-size: 24px;
  color: #191919;
  padding-bottom: 16px;
}

.go-home {
  width: 130px;
  height: 38px;
  background: #c9141d;
  line-height: 38px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
}
h5 {
  display: flex;
  justify-content: center;
}
</style>
