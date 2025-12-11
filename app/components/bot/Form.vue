<script setup lang="ts">
import Anexos from "./anexos.vue";
import Certificado from "./certificado.vue";
import Credencial from "./credencial.vue";
import Xlsxfile from "./xlsxfile.vue";

const model = defineModel({ type: Boolean, required: true, default: false });
const props = defineProps<{ bot: BotInfo | undefined }>();
const fileUploader = new FileUploader();
const toast = useToast();
const bots = useBotStore();
const { FormBot } = useBotForm();
const { seed, isFileUploading } = storeToRefs(useBotForm());

const ConfirmDados = ref(false);

class FormBotManager {
  static async clearForm(val: boolean) {
    if (!val) {
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

    let title = "Erro";
    let message = "Erro ao iniciar robô";

    try {
      FormBot.configuracao_form = props.bot?.configuracao_form as ConfigForm;
      FormBot.sid_filesocket = seed.value;
      FormBot.bot_id = Number(props.bot?.Id);
      const form: Record<string, any> = {};
      Object.entries(FormBot).forEach(([k, v]) => {
        if (v) {
          if (typeof v === "string" || typeof v === "number") {
            form[k] = v;
          }
          if (v instanceof File) {
            form[k] = v.name;
          }
          if (Array.isArray(v) && v.every((item) => item instanceof File)) {
            form[k] = v.map((i) => i.name);
          }
        }
      });

      const endpoint = `/bot/${props.bot?.sistema}/run`.toLowerCase();
      const response = await api.post<StartBotPayload>(endpoint, form, {});
      message = response.data.message;
      title = response.data.title;
    } catch {}

    toast.create({
      title: title,
      body: message,
    });
  }
  static async handleFiles(data: CertificadoFile | KbdxFile | File | File[] | null) {
    if (Array.isArray(data)) {
      await fileUploader.uploadMultipleFile(data);
      return;
    }
    await fileUploader.uploadFile(data as File);
  }
}

onMounted(() => {
  const { $uuid: uuid } = useNuxtApp();
  seed.value = uuid.v4().toString();
});
watch(model, FormBotManager.clearForm);

watch(
  () => FormBot.certificado,
  async (newV) => FormBotManager.handleFiles(newV),
  { deep: true },
);
watch(
  () => FormBot.anexos,
  async (newV) => FormBotManager.handleFiles(newV),
  { deep: true },
);
watch(
  () => FormBot.kbdx,
  async (newV) => FormBotManager.handleFiles(newV),
  { deep: true },
);
watch(
  () => FormBot.xlsx,
  async (newV) => FormBotManager.handleFiles(newV),
  { deep: true },
);

const botForms: Record<ConfigForm, Component[]> = {
  file_auth: [Xlsxfile, Credencial],
  multiple_files: [Xlsxfile, Anexos, Credencial],
  only_auth: [Credencial],
  only_file: [Xlsxfile],
  pje: [Xlsxfile, Certificado],
  pje_protocolo: [Xlsxfile, Certificado],
  proc_parte: [Xlsxfile, Credencial],
};
</script>

<template>
  <BModal no-footer centered size="lg" header-class="fs-3" v-model="model">
    <template #header>
      {{ props.bot?.display_name }}
    </template>
    <BForm class="d-flex flex-column" @submit="FormBotManager.handleSubmit">
      <BotProgress />
      <component
        :is="ComponentForm"
        v-for="(ComponentForm, idx) in botForms[bot?.configuracao_form as ConfigForm]"
        :key="idx"
      />
      <div
        class="d-flex flex-column p-3 gap-2 mt-5"
        style="min-height: 120px; border-top: 1px solid black"
      >
        <BFormCheckbox v-model="ConfirmDados">
          Confirmo que os dados inseridos estão corretos
        </BFormCheckbox>
        <div class="d-flex flex-column">
          <Transition name="execbtn">
            <BButton
              v-if="ConfirmDados"
              :variant="isFileUploading ? 'outline-success' : 'success'"
              type="submit"
              :disabled="isFileUploading"
            >
              Iniciar!
            </BButton>
          </Transition>
        </div>
      </div>
    </BForm>
  </BModal>
</template>
<style lang="css" scoped>
.execbtn-enter-active,
.execbtn-leave-active {
  transition: all 0.3s ease;
}

.execbtn-enter-from,
.execbtn-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
