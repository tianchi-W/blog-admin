<script setup lang="ts"></script>

<template>
  <Suspense>
    <router-view>
      <template #default="{ Component }">
        <component :is="Component"></component>
      </template>
    </router-view>
  </Suspense>
</template>

<style scoped lang="scss"></style>
