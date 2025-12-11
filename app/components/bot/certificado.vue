<script setup lang="ts">
const { FormBot, current, isFileUploading } = storeToRefs(useBotForm());

const certificado = ref<CertificadoFile>(null);

watch(certificado, (newV) => (FormBot.value.certificado = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Certificado digital (A1)"
    label-size="md"
  >
    <BFormFile
      class="mb-1"
      size="sm"
      v-model="certificado"
      accept=".pfx"
      :disabled="isFileUploading"
      required
    />
    <div v-if="current.sistema === 'PJE'">
      <BotKbdxfile />
    </div>
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
