<script setup lang="ts">
const { FormBot, fileNs } = useBotForm();

const xlsx = ref<File | null>(null);

const fileUploader = new FileUploader();

watch(xlsx, async (newV) => {
  if (newV) {
    await fileUploader.uploadFile(newV as File);
    FormBot.xlsx = newV;
  }
});
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Planilha xlsx"
    label-size="md"
  >
    <BFormFile class="mb-1" size="sm" required accept=".xlsx" v-model="xlsx" />
    <BotProgress />
  </BFormGroup>
</template>
