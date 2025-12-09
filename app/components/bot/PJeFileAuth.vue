<script setup lang="ts">
const model = defineModel<RecordPJeFileAuthForm>();
const props = defineProps<{ bot: BotInfo }>();
const PJeFileAuth = reactive<RecordPJeFileAuthForm>({
  PlanilhaXlsx: undefined,
  certificado: undefined,
  SenhaCertificado: "",
});

const exibeSenha = ref(false);
const opcoesCredenciais = ref<CredenciaisSelect[]>([{ value: undefined, text: "Selecione" }]);
onBeforeMount(async () => {
  opcoesCredenciais.value = await window.botApi.listagemCredenciais(
    props.bot.sistema as SystemBots,
  );
});

onUnmounted(() => {
  opcoesCredenciais.value = [{ value: undefined, text: "Selecione" }];
});

watch(
  () => PJeFileAuth,
  (newValue) => (model.value = newValue),
);
</script>

<template>
  <div class="row g-2 p-3">
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Planilha Xlsx" class="mb-2" label-size="lg">
          <BFormFile
            v-model="PJeFileAuth.PlanilhaXlsx"
            class="mt-3"
            size="lg"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            required
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Certificado Digital" class="mb-2" label-size="lg">
          <BFormFile
            v-model="PJeFileAuth.certificado"
            class="mt-3"
            size="lg"
            :accept="['application/x-pkcs12', '.pfx']"
            required
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 6.5rem">
        <BFormGroup label="Senha Certificado" class="mb-2">
          <BInputGroup>
            <BFormInput
              :type="exibeSenha ? 'text' : 'password'"
              v-model="PJeFileAuth.SenhaCertificado"
            />
            <button
              @click="exibeSenha = !exibeSenha"
              :class="exibeSenha ? 'btn btn-primary' : 'btn btn-outline-primary'"
              type="button"
              id="button-addon2"
            >
              Exibir senha
            </button>
          </BInputGroup>
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12"> </BCol>
  </div>
</template>
