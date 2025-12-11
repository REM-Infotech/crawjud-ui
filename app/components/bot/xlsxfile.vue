<script setup lang="ts">
import FileUploader from "~/utils/FileUploader";

const { FormBot, fileNs } = useBotForm();
const xlsx = ref<File | null>(null);

const fileUploader = new FileUploader();

watch(xlsx, (newV) => (FormBot.xlsx = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Planilha xlsx"
    label-size="md"
  >
    <BFormFile class="mb-1" size="sm" required accept=".xlsx" v-model="xlsx" />
  </BFormGroup>
</template>

<style lang="css" scoped>
.inputbot-enter-active,
.inputbot-leave-active {
  transition: all 0.3s ease;
}

.inputbot-enter-from,
.inputbot-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
