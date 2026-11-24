<script setup lang="ts">
  useHead({
    titleTemplate: (title) => (title ? `${title} - Wishlist` : "Wishlist"),
  });
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
