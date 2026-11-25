<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  const route = useRoute();

  const { data: wishlist, error } = await useFetch(`/api/wishlists/${route.params.id}`);

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode || 500,
      statusMessage: "Wishlist not found",
      fatal: true,
    });
  }
  useSeoMeta({
    title: wishlist.value?.title,
  });
</script>
<template>
  <UContainer class="py-8" v-if="wishlist">
    <UButton
      to="/lists"
      class="mb-4 px-0"
      icon="i-lucide-arrow-left"
      label="Back to wishlists"
      color="neutral"
      variant="link"
    />
    <h1 class="text-2xl font-semibold wrap-break-word">{{ wishlist.title }}</h1>
  </UContainer>
</template>
