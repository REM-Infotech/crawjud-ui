<script setup lang="ts">
const props = defineProps<{ bot: BotInfo }>();
const PJeForm = reactive<RecordPJeProtocoloForm>({
  PlanilhaXlsx: undefined,
  Anexos: undefined,
  certificado: undefined,
  SenhaCertificado: "",
});

const CertificadoUpload = ref(false);
const XlsxFileUpload = ref(false);
const OutrosArquivosUpload = ref(false);

const opcoesCredenciais = ref<CredenciaisSelect[]>([{ value: null, text: "Selecione" }]);
onBeforeMount(async () => {
  opcoesCredenciais.value = await window.botApi.listagemCredenciais(
    props.bot.sistema as SystemBots,
  );
});
</script>

<template>
  <div class="row g-2 p-3">
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Planilha Xlsx" class="mb-2" label-size="lg">
          <BFormFile
            v-model="PJeForm.PlanilhaXlsx"
            class="mt-3"
            size="lg"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Anexos" class="mb-2" label-size="lg">
          <BFormFile
            multiple
            v-model="PJeForm.Anexos"
            class="mt-3"
            size="lg"
            accept="application/pdf"
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Certificado Digital" class="mb-2" label-size="lg">
          <BFormFile
            v-model="PJeForm.certificado"
            class="mt-3"
            size="lg"
            :accept="['application/x-pkcs12', '.pfx']"
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 6.5rem">
        <BFormFloatingLabel label="Senha Certificado" label-for="" class="my-2">
          <BFormInput
            id="floatingEmail"
            type="password"
            placeholder="Senha do certificado"
            v-model="PJeForm.SenhaCertificado"
          />
        </BFormFloatingLabel>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12"> </BCol>
  </div>
</template>
