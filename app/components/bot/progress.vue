<script setup lang="ts">
const { isFileUploading, progressBarValue } = storeToRefs(useBotForm());

const calc = () => Math.floor(Date.now() / 500) % 3;
</script>

<template>
  <Transition name="progressbot">
    <div
      v-if="isFileUploading"
      class="mt-2 mb-3 p-3 border border-secondary border-2 rounded-2 d-flex flex-column gap-3"
    >
      <span class="fw-bold"> Enviando arquivos{{ [".", "..", "..."][calc()] }}</span>
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
