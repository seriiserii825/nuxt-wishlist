<script setup lang="ts">
  interface Props {
    gift?: {
      title: string;
      url: string | null;
      price: number | null;
      note: string | null;
    };
  }
  const emits = defineEmits<{
    (e: "submit", gift: GiftFormState): void;
  }>();

  const { gift } = defineProps<Props>();

  // The textarea needs a plain string, not null; the schema turns "" into null on submit
  const state = reactive<GiftFormState & { note: string }>({
    title: gift?.title || "",
    url: gift?.url || "",
    price: gift?.price || null,
    note: gift?.note || "",
  });

  const priceText = ref(state.price?.toString() || "");

  function onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 8);
    input.value = digits;
    priceText.value = digits;
    state.price = digits ? Number(digits) : null;
  }

  const handleSubmit = () => {
    emits("submit", { ...state });
  };
</script>

<template>
  <UForm :schema="giftSchema" :state="state" class="space-y-4" @submit.prevent="handleSubmit">
    <UFormField label="Name" name="title" required>
      <UInput v-model="state.title" class="w-full" autofocus />
    </UFormField>
    <UFormField label="Product Url" name="url">
      <UInput v-model="state.url" type="url" placeholder="https://" class="w-full" />
    </UFormField>
    <UFormField label="Price" name="price">
      <UInput
        :model-value="priceText"
        input-mode="numeric"
        autocomplete="off"
        placeholder="29990"
        @input="onPriceInput"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Note" name="note">
      <UTextarea v-model="state.note" placeholder="Size,color where to buy" class="w-full" />
    </UFormField>
    <UButton type="submit" class="w-full" label="Save" />
  </UForm>
</template>
