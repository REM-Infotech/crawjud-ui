<script setup lang="ts">
const props = defineProps<{ bot: BotInfo }>();
const FileAuthForm = reactive<RecordFileAuthForm>({
  PlanilhaXlsx: undefined,
  Credencial: null,
});

const ex1Options = ref<CredenciaisSelect[]>([
  {
    value: null,
    text: "Selecione",
  },
]);

onBeforeMount(async () => {
  console.log(props.bot);
  const creds = await window.botApi.listagemCredenciais(props.bot.sistema as SystemBots);
  ex1Options.value.push(...creds);
});

onUnmounted(() => {
  ex1Options.value = [
    {
      value: null,
      text: "Selecione",
    },
  ];
});
</script>

<template>
  <form class="">
    <BRow class="p-5 gap-4">
      <BCol md="12" lg="12" xl="12" sm="12">
        <BFormFile size="lg" v-model="FileAuthForm.PlanilhaXlsx" accept=".xlsx" />
      </BCol>
      <BCol md="12" lg="12" xl="12" sm="12">
        <BFormSelect
          v-model="FileAuthForm.Credencial"
          :options="ex1Options"
          size="lg"
          class="mt-3"
        />
      </BCol>
    </BRow>
  </form>
</template>
