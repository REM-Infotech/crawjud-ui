<script setup lang="ts">
const props = defineProps<{ bot: BotInfo }>();

const FormFileAuth = reactive<RecordFileAuthForm>({ PlanilhaXlsx: undefined, Credencial: null });
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
        <BFormGroup label="Planilha Xlsx" label-size="lg" class="mb-2">
          <BFormFile
            v-model="FormFileAuth.PlanilhaXlsx"
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
        <BFormGroup label="Credencial" label-size="lg">
          <BFormSelect
            v-model="FormFileAuth.Credencial"
            :options="opcoesCredenciais"
            size="lg"
            class="mt-3"
            required
          />
        </BFormGroup>
      </div>
    </BCol>
  </div>
</template>
