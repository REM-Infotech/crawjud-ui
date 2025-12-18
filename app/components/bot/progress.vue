<script setup lang="ts">
const { isFileUploading, progressBarValue } = storeToRefs(useBotForm());
import messageProgress from "./messageProgress";

const calc = () => Math.floor(Date.now() / 500) % 3;

const message = computed(() =>
  progressBarValue.value >= 100
    ? "Arquivo(s) enviado(s) com sucesso!"
    : isFileUploading && progressBarValue.value < 100
      ? `Enviando arquivos${[".", "..", "..."][calc()]}` // Mantém a mensagem animada
      : " Aguardando o envio de arquivos ",
);
</script>

<template>
  <div style="min-height: 30px">
    <div class="mt-2 mb-3 p-3 border border-secondary border-2 rounded-2 d-flex flex-column gap-3">
      <Transition name="progressbot">
        <component :is="messageProgress" />
      </Transition>
    </div>
    <BProgress :value="progressBarValue" />
  </div>
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
