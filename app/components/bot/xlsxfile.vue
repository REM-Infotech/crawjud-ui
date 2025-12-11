<script setup lang="ts">
const { FormBot } = useBotForm();
const { isFileUploading } = storeToRefs(useBotForm());
const xlsx = ref<File | null>(null);

watch(xlsx, async (newV) => (FormBot.xlsx = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Planilha xlsx"
    label-size="md"
  >
    <BFormFile
      class="mb-1"
      size="sm"
      accept=".xlsx"
      v-model="xlsx"
      :disabled="isFileUploading"
      required
    />
  </BFormGroup>
</template>
