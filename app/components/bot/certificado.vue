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
  <div>
    <div class="mb-3 p-3 border border-secondary border-1 rounded-1">
      <BFormGroup label="CPF/CNPJ" label-size="md">
        <BFormInput class="mb-1" size="md" v-model="FormBot.cpf_cnpj_certificado" required />
      </BFormGroup>
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
      <div class="mt-2">
        <BInputGroup id="senhaCertificado">
          <BFormInput
            :class="[exibeSenha ? 'border-warning' : 'border-primary']"
            size="sm"
            id="senhaCertificado"
            :type="exibeSenha ? 'text' : 'password'"
            placeholder="Senha certificado"
            v-model="FormBot.senha_certificado"
          />
          <BTooltip>
            <template #target>
              <BButton
                @click="exibeSenha = !exibeSenha"
                :class="['border', 'border-1', 'rounded-end', borderBtn]"
                :variant="variantBtn"
              >
                <Transition name="fade" mode="out-in">
                  <component :is="IconBtn" />
                </Transition>
              </BButton>
            </template>
            Exibir senha
          </BTooltip>
        </BInputGroup>
      </div>
    </div>
    <div
      class="mb-3 p-3 border border-secondary border-1 rounded-1"
      v-if="current.sistema === 'PJE'"
    >
      <BotKdbxfile />
    </div>
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
