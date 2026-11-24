<script setup lang="ts">
  const { loggedIn, user, clear } = useUserSession();

  async function logout() {
    await clear();
    navigateTo("/");
  }
</script>
<template>
  <header class="border-b border-default">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center justify-between gap-2 font-semibold">
        <UIcon name="i-lucide-gift" class="size-6 text-primary" />
        <span>Wishlist</span>
      </NuxtLink>
      <div class="flex items-center gap-2">
        <UColorModeButton />
        <template v-if="loggedIn && user">
          <UUser
            :name="user.name"
            :description="`@${user.login}`"
            :avatar="{ src: user.avatarUrl, alt: user.name }"
            to="/lists"
          />
          <UButton
            @click="logout"
            variant="ghost"
            color="neutral"
            label="Logout"
            icon="i-lucide-log-out"
          />
        </template>
        <UButton
          v-else
          to="/auth/github"
          variant="ghost"
          external
          color="neutral"
          label="Login with GitHub"
          icon="i-simple-icons-github"
        />
      </div>
    </UContainer>
  </header>
</template>
