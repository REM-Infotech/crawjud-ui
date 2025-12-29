<script setup lang="ts">
import MaterialSymbolsLightPassword2 from "~icons/material-symbols-light/password-2?width=24px&height=24px";
import MaterialSymbolsLightPassword from "~icons/material-symbols-light/password?width=24px&height=24px";

const { FormBot, current, isFileUploading } = storeToRefs(useBotForm());

const certificado = ref<CertificadoFile>(null);

watch(certificado, (newV) => (FormBot.value.certificado = newV));

const exibeSenha = ref(false);

const IconBtn = computed(() =>
  exibeSenha.value ? MaterialSymbolsLightPassword2 : MaterialSymbolsLightPassword,
);
const borderBtn = computed(() => (exibeSenha.value ? "border-warning" : "border-primary"));
const variantBtn = computed(() => (exibeSenha.value ? "outline-warning" : "primary"));
</script>

<template>
  <div class="p-3 border border-secondary border-2 rounded-2">
    <BFormGroup label="CPF/CNPJ" label-size="md">
      <BFormInput class="mb-3" size="md" v-model="FormBot.cpf_cnpj_certificado" required />
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
    <div class="mt-3">
      <AppInputPassword
        id="senhaCertificado"
        placeholder="Senha certificado"
        v-model="FormBot.senha_certificado"
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
