<script setup lang="ts">
const { FormBot } = storeToRefs(useBotForm());
const query = ref("");
const bots = useBotStore();
const computedCredenciais = computed(() =>
  bots.credenciais.filter((key) => {
    const check = key.text.toLowerCase().includes(query.value.toLowerCase());
    if (!query.value) {
      return key;
    }
    if (check) {
      FormBot.value.credencial = key.value;
      return key;
    }
  }),
);

const credencial = ref<number | null | undefined>(null);
watch(credencial, (newV) => (FormBot.value.credencial = newV));
</script>

<template>
  <BFormGroup
    class="mb-3 p-3 border border-secondary border-2 rounded-2"
    label="Credenciais"
    label-size="md"
  >
    <div class="p-3 d-flex flex-column gap-3 border border-secondary border-1 rounded-1">
      <BFormInput size="sm" placeholder="Filtre" v-model="query" />
      <BFormSelect size="sm" :options="computedCredenciais" v-model="FormBot.credencial" required />
      <input type="text" v-model="FormBot.credencial" style="display: none" required />
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
