<script setup lang="ts">
const { selects, FormBot } = useBotForm();
const certificado = ref<CertificadoFile>(null);
watch(certificado, (newV) => (FormBot.certificado = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Arquivos de execução"
    label-size="lg"
  >
    <div class="d-flex flex-column gap-2" s>
      <BFormCheckbox switch v-model="selects.enviaCertificado">
        Certificado? {{ selects.enviaCertificado ? "Sim" : "Não" }}
      </BFormCheckbox>
      <Transition name="inputbot" mode="in-out">
        <div v-if="selects.enviaCertificado">
          <BFormFile class="mb-1" size="md" required accept=".pfx" v-model="certificado" />
        </div>
      </Transition>
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
