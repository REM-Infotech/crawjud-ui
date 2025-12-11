<script setup lang="ts">
const { FormBot } = useBotForm();
const kbdx = ref<KbdxFile>(null);
watch(kbdx, (newV) => (FormBot.kbdx = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Arquivo KBDX (Para 2FA)"
    label-size="lg"
  >
    <BFormFile class="mb-1" size="md" required accept=".kbdx" v-model="kbdx" />
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
