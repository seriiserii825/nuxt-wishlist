<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  useSeoMeta({
    title: "My wishlist",
  });

  const { user } = useUserSession();
</script>
<template>
  <UContainer>
    <h1 class="font-2xl text-semibold">My wishlist</h1>
    <p>Hello, {{ user?.name }}</p>
    <UEmpty
      class="mt-8"
      icon="i-lucide-gift"
      title="Now is empty"
      description="Soon will be wishlist"
    />
  </UContainer>
</template>
