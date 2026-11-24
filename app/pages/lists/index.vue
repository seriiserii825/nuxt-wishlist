<script setup lang="ts">
  useSeoMeta({
    title: "My wishlist",
  });
</script>
<template>
  <UContainer>
    <h1 class="font-2xl text-semibold">My wishlist</h1>
    <UEmpty
      class="mt-8"
      icon="i-lucide-gift"
      title="Now is empty"
      description="Soon will be wishlist"
    />
  </UContainer>
</template>
