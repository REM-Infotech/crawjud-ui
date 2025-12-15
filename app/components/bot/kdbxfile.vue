<script setup lang="ts">
const { FormBot, isFileUploading } = storeToRefs(useBotForm());
const kdbx = ref<KbdxFile>(null);

watch(kdbx, (newV) => (FormBot.value.kdbx = newV));
</script>

<template>
  <div class="d-flex flex-column gap-1">
    <BFormGroup label="Arquivo .kdbx (Para 2FA)" label-size="md">
      <BFormFile
        class="mb-1"
        size="md"
        accept=".kdbx"
        v-model="kdbx"
        :disabled="isFileUploading"
        required
      />
    </BFormGroup>
    <div class="mt-2">
      <AppInputPassword id="senhaKdbx" placeholder="Senha database" v-model="FormBot.senha_kdbx" />
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
