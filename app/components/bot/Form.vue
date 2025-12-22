<script setup lang="ts">
import Anexos from "./anexos.vue";
import Credencial from "./credencial.vue";
import Xlsxfile from "./xlsxfile.vue";

const execStore = useExecutionStore();
const model = defineModel({ type: Boolean, required: true, default: false });
const props = defineProps<{ bot: CrawJudBot | undefined }>();
const toast = useToast();
const bots = useBotStore();
const { FormBot } = useBotForm();
const { seed, isFileUploading, progressBarValue } = storeToRefs(useBotForm());
const { execucaoBot, execucao } = storeToRefs(execStore);
const ConfirmDados = ref(false);

const uploader = FileUploader();

class FormBotManager {
  static async clearForm() {
    Object.entries(FormBot).forEach(([key, _]) => {
      FormBot[key as keyof typeof FormBot] = null;
    });
    bots.resetCredenciais();
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

      if (response.status === 200) {
        const pid = response.data.pid;
        execucaoBot.value = pid;
        execucao.value = {
          status: "Em Execução",
          pid: pid,
          data_fim: "",
          data_inicio: "",
          Id: 0,
          bot: "",
        };

        useRouter().push({ name: "execucoes" });
      }
    } catch (err) {
      console.log(err);
    }

    toast.create({
      title: title,
      body: message,
    });
  }
  static async handleFiles(data: CertificadoFile | KbdxFile | File | File[] | null) {
    if (data) {
      if (Array.isArray(data)) {
        await uploader.uploadMultipleFile(data);
        return;
      }
      await uploader.uploadFile(data as File);
    }
  }
}

onMounted(() => {
  const { $uuid: uuid } = useNuxtApp();
  seed.value = uuid.v4().toString();
});
watch(model, FormBotManager.clearForm);
watch(model, (newV) => {
  if (newV) bots.listar_credenciais(props.bot as CrawJudBot);
});

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
  () => FormBot.kdbx,
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
  proc_parte: [Xlsxfile, Credencial],
};

onUnmounted(() => FormBotManager.clearForm());
</script>

<template>
  <BModal no-footer centered size="lg" header-class="fs-3" v-model="model">
    <template #header>
      {{ props.bot?.display_name }}
    </template>
    <div style="min-height: calc(100dvh - 150px)">
      <BForm class="d-flex flex-column" @submit="FormBotManager.handleSubmit">
        <component
          :is="ComponentForm"
          v-for="(ComponentForm, idx) in botForms[bot?.configuracao_form as ConfigForm]"
          :key="idx"
        />
        <div style="min-height: 120px">
          <BotProgress />
        </div>
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
    </div>
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
