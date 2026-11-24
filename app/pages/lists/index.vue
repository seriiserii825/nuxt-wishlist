<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  useSeoMeta({
    title: "My wishlist",
  });

  const { user } = useUserSession();

  const { data: wishlists } = await useFetch("/api/wishlists");
</script>
<template>
  <UContainer>
    <h1 class="font-2xl text-semibold">My wishlist</h1>
    <p>Hello, {{ user?.name }}</p>
    <UEmpty
      v-if="!wishlists?.length"
      class="mt-8"
      icon="i-lucide-gift"
      title="Now is empty"
      description="Soon will be wishlist"
    />
    <ul v-else class="mt-8">
      <li v-for="wishlist in wishlists" :key="wishlist.id">
        <UCard>{{ wishlist.title }}</UCard>
      </li>
    </ul>
  </UContainer>
</template>
