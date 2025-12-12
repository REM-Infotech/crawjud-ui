<script setup lang="ts">
import MaterialSymbolsLightPassword2 from "~icons/material-symbols-light/password-2?width=24px&height=24px";
import MaterialSymbolsLightPassword from "~icons/material-symbols-light/password?width=24px&height=24px";

import type { BaseColorVariant } from "bootstrap-vue-next";

type Variants = keyof BaseColorVariant;

const { FormBot, isFileUploading } = storeToRefs(useBotForm());
const kdbx = ref<KbdxFile>(null);

watch(kdbx, (newV) => (FormBot.value.kdbx = newV));
const exibeSenha = ref(false);

const IconBtn = computed(() =>
  exibeSenha.value ? MaterialSymbolsLightPassword2 : MaterialSymbolsLightPassword,
);
const borderBtn = computed(() => (exibeSenha.value ? "border-warning" : "border-primary"));
const variantBtn = computed(() => (exibeSenha.value ? "outline-warning" : "primary"));
</script>

<template>
  <div class="d-flex flex-column gap-1">
    <BFormGroup label="Arquivo .kdbx (Para 2FA)" label-size="md">
      <BFormFile
        class="mb-1"
        size="md"
        accept=".kdbx"
        v-model="kdbx"
        :disabled="isFileUploading"
        required
      />
    </BFormGroup>
    <div class="mt-2">
      <BInputGroup id="senhaKdbx">
        <BFormInput
          :class="[exibeSenha ? 'border-warning' : 'border-primary']"
          size="sm"
          id="senhaKdbx"
          :type="exibeSenha ? 'text' : 'password'"
          placeholder="Senha database"
          v-model="FormBot.senha_kdbx"
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
    </div>
  </div>
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
