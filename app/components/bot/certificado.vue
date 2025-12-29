<script setup lang="ts">
const { isFileUploading } = storeToRefs(useBotForm());
const { FormCredencial } = storeToRefs(useCredencialFormStore());
const certificado = ref<CertificadoFile>(null);
watch(certificado, (newV) => (FormCredencial.value.certificado = newV));
</script>

<template>
  <div class="p-3 border border-secondary border-2 rounded-2">
    <BFormGroup label="CPF/CNPJ" label-size="md">
      <BFormInput class="mb-3" size="md" v-model="FormCredencial.cpf_cnpj_certificado" required />
    </BFormGroup>
    <hr />
    <BFormGroup label="Certificado digital (A1)" label-size="md">
      <BFormFile
        class="mb-1"
        size="md"
        v-model="certificado"
        accept=".pfx"
        :disabled="isFileUploading"
        required
      />
    </BFormGroup>
    <div class="mt-3 mb-3">
      <AppInputPassword
        id="senhaCertificado"
        placeholder="Senha certificado"
        v-model="FormCredencial.senha_certificado"
        :disabled="false"
      />
    </div>
    <AppOtpInput />
  </div>
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
