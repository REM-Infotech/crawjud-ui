<script setup lang="ts">
const { FormBot } = useBotForm();
const kbdx = ref<KbdxFile>(null);
watch(kbdx, (newV) => (FormBot.kbdx = newV));
</script>

<template>
  <BFormGroup class="mt-3" label="Arquivo .kbdx (Para 2FA)" label-size="md">
    <BFormFile class="mb-1" size="sm" required accept=".kbdx" v-model="kbdx" />
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
