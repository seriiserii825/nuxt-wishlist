<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  useSeoMeta({
    title: "My wishlist",
  });

  const { user } = useUserSession();
  const toast = useToast();
  const { data: wishlists, refresh } = await useFetch("/api/wishlists");
  const state = reactive({
    title: "",
  });

  async function create() {
    try {
      await $fetch("/api/wishlists", { method: "POST", body: state });
      state.title = "";
      await refresh();
    } catch (error) {
      const message =
        (error as { data?: { message?: string } }).data?.message || "Something went wrong";
      toast.add({ title: message || "Something went wrong", color: "error" });
    }
  }
</script>
<template>
  <UContainer>
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
    <ul v-else class="mt-8">
      <li v-for="wishlist in wishlists" :key="wishlist.id">
        <UCard>{{ wishlist.title }}</UCard>
      </li>
    </ul>
  </UContainer>
</template>
