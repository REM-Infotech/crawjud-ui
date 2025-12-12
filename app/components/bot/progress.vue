<script setup lang="ts">
const { isFileUploading, progressBarValue } = storeToRefs(useBotForm());

const calc = () => Math.floor(Date.now() / 500) % 3;
</script>

<template>
  <Transition name="progressbot">
    <div class="mt-2 mb-3 p-3 border border-secondary border-2 rounded-2 d-flex flex-column gap-3">
      <div style="min-height: 30px">
        <span v-if="progressBarValue === 100" class="fw-bold text-success">
          Arquivo(s) enviado(s) com sucesso!
        </span>
        <span v-if="isFileUploading && progressBarValue < 100" class="fw-bold">
          Enviando arquivos{{ [".", "..", "..."][calc()] }}</span
        >
        <span v-if="!isFileUploading"> Aguardando o envio de arquivos </span>
      </div>
      <BProgress :value="progressBarValue" />
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.progressbot-enter-active,
.progressbot-leave-active {
  transition: all 0.3s ease;
}

.progressbot-enter-from,
.progressbot-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
