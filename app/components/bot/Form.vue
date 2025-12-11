<script setup lang="ts">
const model = defineModel({ type: Boolean, required: true, default: false });
const props = defineProps<{ bot: BotInfo | undefined }>();

const modal = useModal();
const toast = useToast();
const bots = useBotStore();
const { selects, FormBot } = useBotForm();

class FormBotManager {
  static async clearForm(val: boolean) {
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
  }
  static async handleSubmit(e: Event) {
    e.preventDefault();
    toast.create({
      body: "submitted!",
    });
  }
}

watch(model, FormBotManager.clearForm);
</script>

<template>
  <BModal no-footer centered size="lg" v-model="model">
    <template #header>
      {{ props.bot?.display_name }}
    </template>
    <BForm
      class="d-flex flex-column"
      style="min-height: 100px"
      @submit="FormBotManager.handleSubmit"
    >
      <BotXlsxfile />
      <BotAnexos />
      <BotCredencial />
      <BotCertificado v-if="bot?.sistema === 'PJE'" />
      <div class="d-flex flex-column p-3">
        <BButton variant="success" type="submit"> Iniciar! </BButton>
      </div>
    </BForm>
  </BModal>
</template>
