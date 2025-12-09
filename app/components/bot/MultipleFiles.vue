<script setup lang="ts">
const props = defineProps<{ bot: BotInfo }>();
const MultipleFilesForm = reactive<RecordMultipleFilesForm>({
  PlanilhaXlsx: undefined,
  Credencial: null,
  Anexos: undefined,
});

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
            v-model="MultipleFilesForm.PlanilhaXlsx"
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
            v-model="MultipleFilesForm.Anexos"
            class="mt-3"
            size="lg"
            accept="application/pdf"
          />
        </BFormGroup>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12"> </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <BFormGroup label="Credencial" label-size="lg">
        <BFormSelect
          v-model="MultipleFilesForm.Credencial"
          :options="opcoesCredenciais"
          size="lg"
          class="mt-3"
        />
      </BFormGroup>
    </BCol>
  </div>
</template>
