<script setup lang="ts">
  const { loggedIn } = useUserSession();
  const links = computed(() => [
    loggedIn.value
      ? { label: "My wishlist", to: "/lists", icon: "i-lucide-list" }
      : {
          label: "Auth with Github",
          to: "/auth/github",
          external: true,
          icon: "i-simple-icons-github",
        },
  ]);
</script>
<template>
  <UPageHero
    title="Wishlist App"
    subtitle="Discover amazing content and connect with our community."
    :links="links"
  />
</template>
