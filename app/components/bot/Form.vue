<script setup lang="ts">
import Anexos from "./anexos.vue";
import Certificado from "./certificado.vue";
import Credencial from "./credencial.vue";
import Xlsxfile from "./xlsxfile.vue";

const model = defineModel({ type: Boolean, required: true, default: false });
const props = defineProps<{ bot: BotInfo | undefined }>();

const toast = useToast();
const bots = useBotStore();
const { selects, FormBot } = useBotForm();

const ConfirmDados = ref(false);

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
            <BButton v-if="ConfirmDados" variant="success" type="submit"> Iniciar! </BButton>
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
