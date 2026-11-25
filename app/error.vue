<script setup lang="ts">
  import type { NuxtError } from "#app";

  const props = defineProps<{
    error: NuxtError;
  }>();

  const title = computed(() => {
    if (props.error.statusCode === 404) {
      return "Wishlist not found";
    }
    return "Something went wrong";
  });

  useSeoMeta({
    title: title.value,
  });
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UContainer class="py-8">
        <UEmpty
          class="mt-8"
          icon="i-lucide-gift"
          :title="title"
          :description="error.message || 'Something went wrong'"
          :actions="[
            {
              label: 'Back to wishlists',
              onClick: () => clearError({ redirect: '/' }),
            },
          ]"
        />
      </UContainer>
    </NuxtLayout>
  </UApp>
</template>
