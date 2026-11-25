<script setup lang="ts">
  interface Props {
    gift: {
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

  const state = reactive<GiftFormState>({
    title: gift.title || "",
    url: gift.url || "",
    price: gift.price || null,
    note: gift.note || "",
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
    emits("submit", state);
  };
</script>

<template>
  <UForm :schema="giftSchema" :state="state" class="space-y-4" @submit.prevent="handleSubmit">
    <UInput v-model="state.title" label="Title" placeholder="Enter gift title" required />
  </UForm>
</template>
