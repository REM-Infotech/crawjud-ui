<script setup lang="ts">
const { FormBot, isFileUploading } = storeToRefs(useBotForm());
const anexos = ref<File[] | null>(null);

watch(anexos, (newV) => (FormBot.value.anexos = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Anexos"
    label-size="md"
  >
    <BFormFile
      class="mb-1"
      size="sm"
      :disabled="isFileUploading"
      accept=".pdf, .docx"
      v-model="anexos"
      multiple
      required
    />
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
