<script setup lang="ts"></script>

<template>
  <router-view>
    <template #default="{ Component, route }">
      <component :is="Component"></component>
    </template>
  </router-view>
</template>

<style scoped lang="scss"></style>
