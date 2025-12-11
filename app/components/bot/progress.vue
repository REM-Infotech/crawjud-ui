<script setup lang="ts">
const { progressBarValue } = storeToRefs(useBotForm());
</script>

<template>
  <div class="mt-2" style="min-height: 15px">
    <Transition name="progressbot">
      <BProgress :value="progressBarValue" v-if="progressBarValue > 0" />
    </Transition>
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
