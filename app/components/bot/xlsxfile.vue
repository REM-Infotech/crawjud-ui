<script setup lang="ts">
const { selects, FormBot } = useBotForm();
const xlsx = ref<File | null>(null);
watch(xlsx, (newV) => (FormBot.xlsx = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Arquivos de execução"
    label-size="lg"
  >
    <div class="d-flex flex-column gap-2" s>
      <BFormCheckbox switch v-model="selects.enviaXlsx">
        Arquivo Xlsx? {{ selects.enviaXlsx ? "Sim" : "Não" }}
      </BFormCheckbox>
      <div style="min-height: 50px">
        <Transition name="inputbot" mode="in-out">
          <div v-if="selects.enviaXlsx">
            <BFormFile class="mb-1" size="md" required accept=".xlsx" v-model="xlsx" />
          </div>
        </Transition>
      </div>
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
