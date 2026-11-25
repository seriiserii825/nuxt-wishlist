<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  useSeoMeta({
    title: "My wishlist",
  });

  const { user } = useUserSession();
  const { data: wishlists, refresh } = await useFetch("/api/wishlists");
  const state = reactive({
    title: "",
  });

  async function create() {
    try {
      const wishlist = await $fetch("/api/wishlists", { method: "POST", body: state });
      return navigateTo(`/lists/${wishlist.id}`);
    } catch (error) {
      showToastError(error, "Failed to create wishlist");
    }
  }
</script>
<template>
  <UContainer class="py-8">
    <h1 class="font-2xl text-semibold">My wishlist</h1>
    <p>Hello, {{ user?.name }}</p>
    <UForm
      :schema="wishlistSchema"
      :state="state"
      class="mt-6 flex items-start gap-2"
      @submit="create"
    >
      <UFormField name="title" class="flex-1">
        <UInput class="w-full" v-model="state.title" placeholder="Wishlist title" />
      </UFormField>
      <UButton type="submit" icon="i-lucide-plus" label="Create" />
    </UForm>
    <UEmpty
      v-if="!wishlists?.length"
      class="mt-8"
      icon="i-lucide-gift"
      title="Now is empty"
      description="Soon will be wishlist"
    />
    <ul v-else class="mt-8 flex flex-col gap-4">
      <li v-for="wishlist in wishlists" :key="wishlist.id">
        <NuxtLink :to="`/lists/${wishlist.id}`" class="block">
          <UCard class="transition hover:bg-elevated">{{ wishlist.title }}</UCard>
        </NuxtLink>
      </li>
    </ul>
  </UContainer>
</template>
