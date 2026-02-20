<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
  import { useStore } from '@/store/store'

  const store = useStore()

  await Promise.all([
    store.getProducts(),
    store.getCategories(),
  ])
</script>

<style>
.page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>