<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });
  const route = useRoute();

  const apiUrl = `/api/wishlists/${route.params.id}` as const;

  const { data: wishlist, error, refresh } = await useFetch(apiUrl);

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
      await $fetch(apiUrl, {
        method: "DELETE",
      });
      navigateTo("/lists");
    } catch (error) {
      showToastError(error, "Failed to delete wishlist");
    } finally {
      deleting.value = false;
      deleteOpen.value = false;
    }
  }

  type Gift = NonNullable<typeof wishlist.value>["gifts"][number];

  function storeName(url: string): string {
    return new URL(url).hostname.replace("www.", "");
  }

  const giftFormOpen = ref(false);
  const editGift = ref<Gift>();

  function openGiftForm(gift?: Gift) {
    editGift.value = gift;
    giftFormOpen.value = true;
  }

  async function saveGift(gift: GiftFormState) {
    try {
      if (editGift.value) {
        await $fetch(`${apiUrl}/gifts/${editGift.value.id}`, {
          method: "PATCH",
          body: gift,
        });
      } else {
        await $fetch(`${apiUrl}/gifts`, {
          method: "POST",
          body: gift,
        });
      }
      giftFormOpen.value = false;
      await refresh();
    } catch (error) {
      showToastError(error, "Failed to save gift");
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
    <h1 class="text-2xl mb-4 font-semibold wrap-break-word">{{ wishlist.title }}</h1>
    <div class="flex gap-2">
      <UButton icon="i-lucide-plus" label="Add gift" @click="openGiftForm()" />
      <UButton
        icon="i-lucide-trash-2"
        label="Delete wishlist"
        color="error"
        variant="soft"
        @click="deleteOpen = true"
      />
    </div>
    <UEmpty
      v-if="wishlist.gifts.length === 0"
      class="mt-8"
      icon="i-lucide-gift"
      title="No gifts yet"
      description="Add a gift to this wishlist to get started."
    />
    <ul v-else class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="gift in wishlist.gifts" :key="gift.id">
        <UCard class="h-full" :ui="{ root: 'flex flex-col', body: 'flex flex-1 flex-col gap-2' }">
          <p class="font-medium wrap-break-word">{{ gift.title }}</p>
          <p v-if="gift.price" class="text-xl font-bold">{{ formatPrice(gift.price) }}</p>
          <p v-if="gift.note" class="text-sm text-muted wrap-break-word">
            {{ gift.note }}
          </p>
          <UButton
            v-if="gift.url"
            :to="gift.url"
            target="_blank"
            rel="noopener noreferrer"
            :label="storeName(gift.url)"
            trailing-icon="i-lucide-external-link"
            color="neutral"
            variant="soft"
            size="sm"
            class="self-start"
          />
          <div class="mt-auto flex justify-end gap-1 pt-2">
            <UButton
              icon="i-lucide-edit"
              label="Edit"
              color="neutral"
              variant="soft"
              size="sm"
              @click="openGiftForm(gift)"
            />
          </div>
        </UCard>
      </li>
    </ul>
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

    <UModal
      v-model:open="giftFormOpen"
      :title="editGift ? 'Edit gift' : 'Add gift'"
      :description="
        editGift ? 'Edit the details of this gift.' : 'Add a new gift to this wishlist.'
      "
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <GiftForm :gift="editGift" @submit="saveGift" />
      </template>
    </UModal>
  </UContainer>
</template>
