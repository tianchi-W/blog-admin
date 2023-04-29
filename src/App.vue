<script setup lang="ts">
console.log(import.meta.env.VITE_APP_BASE_API)
</script>

<template>
  <router-view>
    <template #default="{ Component, route }">
      <component :is="Component"></component>
    </template>
  </router-view>
</template>

<style scoped lang="scss"></style>
