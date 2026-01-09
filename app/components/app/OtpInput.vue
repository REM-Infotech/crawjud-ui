<script setup lang="ts">
const { FormCredencial } = useCredencialFormStore();

function AbrirTutorial(ev: Event) {
  ev.preventDefault();

  alert("Caso não saibar usar a ferramenta, veja o vídeo inteiro!");

  alert(
    'Após configurar, Vá em "Configurar entrada > avançado > otp". Clique em "revelar" e copie o link inteiro do OTP',
  );

  window.open("https://youtu.be/0CYzSJOAJFQ?t=687");
}
</script>

<template>
  <div class="mb-3 p-3 border border-secondary border-1 rounded-1">
    <BFormCheckbox
      switch
      class="mb-3"
      @click="FormCredencial.requer_duplo_fator = !FormCredencial.requer_duplo_fator"
    >
      Requer MFA (autenticação de dois fatores) ?
    </BFormCheckbox>

    <BRow v-if="FormCredencial.requer_duplo_fator">
      <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
        <BTooltip interactive>
          <template #target>
            <BFormGroup label="URI OTP">
              <AppInputPassword
                id="opt-input"
                placeholder="otpauth://totp/otp-mfa"
                v-model="FormCredencial.otp"
              />
            </BFormGroup>
          </template>
          Válido apenas se estiver usando o KeePassXC como gerenciador de MFA.

          <p>
            Caso nao tenha conhecimento da ferramenta,
            <a
              class="link-opacity-100 link-offset-3 link-secondary"
              href="#"
              @click="AbrirTutorial"
            >
              Veja este tutorial.</a
            >
          </p>
        </BTooltip>
      </BCol>
    </BRow>
  </div>
</template>
