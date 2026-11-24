<template>
  <header class="border-b border-default">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center justify-between gap-2 font-semibold">
        <UIcon name="i-lucide-gift" class="size-6 text-primary" />
        <span>Wishlist</span>
      </NuxtLink>
      <div class="flex items-center gap-2">
        <UButton to="/lists" label="My whishlists" variant="ghost" />
        <UColorModeButton />
      </div>
    </UContainer>
  </header>
</template>
