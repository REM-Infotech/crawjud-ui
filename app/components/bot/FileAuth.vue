<script setup lang="ts">
const model = defineModel<RecordFileAuthForm>();
const props = defineProps<{ bot: BotInfo }>();

const FormFileAuth = reactive<RecordFileAuthForm>({ PlanilhaXlsx: [], Credencial: null });
const computedFiles = computed(() => FormFileAuth.PlanilhaXlsx);
const opcoesCredenciais = ref<CredenciaisSelect[]>([{ value: null, text: "Selecione" }]);
function removeFile(idx: number) {
  FormFileAuth.PlanilhaXlsx?.splice(idx, 1);
}

watch(
  () => ({ ...FormFileAuth }),
  (newValue) => {
    model.value = newValue;
  },
  { deep: true },
);

onBeforeMount(async () => {
  opcoesCredenciais.value = await window.botApi.listagemCredenciais(
    props.bot.sistema as SystemBots,
  );
});
onUnmounted(() => {
  opcoesCredenciais.value = [{ value: null, text: "Selecione" }];
});
</script>

<template>
  <div class="row g-2 p-3">
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Planilha Xlsx" label-size="lg" class="mb-2">
          <AppDropFile
            v-model="FormFileAuth.PlanilhaXlsx"
            v-if="FormFileAuth.PlanilhaXlsx?.length === 0"
          />
        </BFormGroup>
      </div>
      <div class="p-3">
        <TransitionGroup class="list-group" tag="ul" name="list">
          <li
            @click="removeFile(idx)"
            class="list-group-item list-group-item-action"
            v-for="(file, idx) in computedFiles"
            :key="idx"
          >
            <div>
              {{ file.name }}
            </div>
          </li>
        </TransitionGroup>
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

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
