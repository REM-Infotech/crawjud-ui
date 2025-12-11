<script setup lang="ts">
const model = defineModel({ type: Boolean, required: true, default: false });
const props = defineProps<{ bot: BotInfo | undefined }>();

const bots = useBotStore();
const { selects, FormBot } = useBotForm();

watch(model, async (val) => {
  if (!val) {
    Object.entries(selects).forEach(([key, _]) => {
      selects[key as keyof typeof selects] = false;
    });
    Object.entries(FormBot).forEach(([key, _]) => {
      FormBot[key as keyof typeof FormBot] = null;
    });
    bots.resetCredenciais();
    return;
  }
  bots.listar_credenciais(props.bot as BotInfo);
});

watch(
  () => FormBot,
  (newValue) => console.log(newValue),
  { deep: true },
);
</script>

<template>
  <BModal no-footer centered size="lg" v-model="model">
    <template #header>
      {{ props.bot?.display_name }}
    </template>
    <BForm>
      <BotXlsxfile v-model="FormBot.xlsx" />
      <BotAnexos v-model="FormBot.anexos" />
      <BotCredencial v-model="FormBot.credencial" />
    </BForm>
  </BModal>
</template>

<style lang="css" scoped>
.xlsx-enter-active,
.xlsx-leave-active {
  transition: all 0.3s ease;
}

.xlsx-enter-from,
.xlsx-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
