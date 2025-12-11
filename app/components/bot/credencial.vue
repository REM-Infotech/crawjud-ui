<script setup lang="ts">
const { selects, FormBot } = useBotForm();
const query = ref("");
const bots = useBotStore();
const computedCredenciais = computed(() =>
  bots.credenciais.filter((key) => {
    const check = key.text.toLowerCase().includes(query.value.toLowerCase());
    if (!query.value) {
      return key;
    }
    if (check) {
      FormBot.credencial = key.value;
      return key;
    }
  }),
);

const credencial = ref<number | null | undefined>(null);
watch(credencial, (newV) => (FormBot.credencial = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-1 rounded-1"
    label="Credenciais"
    label-size="lg"
  >
    <div class="d-flex flex-column gap-2" s>
      <BFormCheckbox switch v-model="selects.needCredencial">
        Necessita credencial? {{ selects.needCredencial ? "Sim" : "Não" }}
      </BFormCheckbox>
      <Transition name="inputbot" mode="in-out">
        <div
          v-if="selects.needCredencial"
          class="d-flex flex-column p-3 gap-3 border border-secondary border-2 rounded-2"
        >
          <BFormInput size="md" placeholder="Filtre" v-model="query" />
          <BFormSelect size="md" :options="computedCredenciais" v-model="FormBot.credencial" />
        </div>
      </Transition>
    </div>
  </BFormGroup>
</template>

<style lang="css" scoped>
.inputbot-enter-active,
.inputbot-leave-active {
  transition: all 0.3s ease;
}

.inputbot-enter-from,
.inputbot-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
