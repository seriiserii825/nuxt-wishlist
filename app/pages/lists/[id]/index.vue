<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  const route = useRoute();
  const toast = useToast();

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

  const deleteOpen = ref(false);
  const deleting = ref(false);

  async function deleteWishlist() {
    deleting.value = true;
    try {
      await $fetch(`/api/wishlists/${route.params.id}`, {
        method: "DELETE",
      });
      navigateTo("/lists");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || "Failed to delete wishlist";
      toast.add({
        title: message ?? "Error",
        color: "error",
      });
    }
  }
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
    <UButton
      class="mt-4"
      icon="i-lucide-trash-2"
      label="Delete wishlist"
      color="error"
      variant="soft"
      @click="deleteOpen = true"
    />
    <UModal
      v-model:open="deleteOpen"
      title="Delete wishlist"
      description="Are you sure you want to delete this wishlist? This action cannot be undone."
      :ui="{ footer: 'justify-end' }"
    >
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="soft" @click="deleteOpen = false" />
        <UButton label="Delete" color="error" :loading="deleting" @click="deleteWishlist" />
      </template>
    </UModal>
  </UContainer>
</template>
