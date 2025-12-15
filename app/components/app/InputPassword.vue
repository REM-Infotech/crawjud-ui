<script setup lang="ts">
import { BFormInput } from "bootstrap-vue-next";
import MaterialSymbolsLightPassword2 from "~icons/material-symbols-light/password-2?width=24px&height=24px";
import MaterialSymbolsLightPassword from "~icons/material-symbols-light/password?width=24px&height=24px";

const model = defineModel<Numberish | null | undefined>();
const props = defineProps<{ id: string; placeholder: str }>();
const exibeSenha = ref(false);

const IconBtn = computed(() =>
  exibeSenha.value ? MaterialSymbolsLightPassword2 : MaterialSymbolsLightPassword,
);
const borderBtn = computed(() => (exibeSenha.value ? "border-warning" : "border-primary"));
const variantBtn = computed(() => (exibeSenha.value ? "outline-warning" : "primary"));

const isCapsOn = ref(false);
function capsLockIndicator(e: Event) {
  isCapsOn.value = (e as KeyboardEvent).getModifierState("CapsLock");
}
</script>

<template>
  <BInputGroup :id="props.id">
    <BFormInput
      :class="[exibeSenha ? 'border-warning' : 'border-primary']"
      size="sm"
      :id="props.id"
      :type="exibeSenha ? 'text' : 'password'"
      :placeholder="props.placeholder"
      v-model="model"
      @keyup="capsLockIndicator"
    />
    <BTooltip>
      <template #target>
        <BButton
          @click="exibeSenha = !exibeSenha"
          :class="['border', 'border-1', 'rounded-end', borderBtn]"
          :variant="variantBtn"
        >
          <Transition name="fade" mode="out-in">
            <component :is="IconBtn" />
          </Transition>
        </BButton>
      </template>
      Exibir senha
    </BTooltip>
  </BInputGroup>
  <div v-if="isCapsOn" class="text-warning mt-1 fw-bold p-2" style="font-size: 0.95em">
    CapsLock ativo
  </div>
</template>
