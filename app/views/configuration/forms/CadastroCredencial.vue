<script setup lang="ts">
const novaCredencial = defineModel<boolean>();

function handleSubmit(ev: Event) {
  ev.preventDefault();
}

type metodoLogin = "pw" | "cert" | null;

const MetodoLogin = ref(null);

const requerDoisFatores = ref(false);
type OpcoesTipoCredencial = { value?: metodoLogin; text: string; disabled?: boolean };
const opcoesTipoCredencial: OpcoesTipoCredencial[] = [
  { value: null, text: "Selecione uma opção", disabled: true },
  { value: "pw", text: "Usuário e Senha" },
  { value: "cert", text: "Certificado" },
];

function AbrirTutorial(ev: Event) {
  ev.preventDefault();

  alert("Caso não saibar usar o App, veja o vídeo inteiro!");

  alert(
    'Após configurar, Vá em "Configurar entrada > avançado > otp". Clique em "revelar" e copie o link inteiro do OTP',
  );

  window.open("https://youtu.be/0CYzSJOAJFQ?t=687");
}
</script>

<template>
  <BModal no-footer centered size="lg" header-class="fs-4" v-model="novaCredencial">
    <template #header>
      <span class="fw-bold"> Nova credencial </span>
    </template>

    <BForm @submit="handleSubmit">
      <div class="row gap-1 justify-content-center">
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
          <BFormGroup label="Nome Credencial">
            <BFormInput />
          </BFormGroup>
        </BCol>

        <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
          <BFormGroup label="Método de autenticação">
            <BFormSelect v-model="MetodoLogin" :options="opcoesTipoCredencial" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="p-3" style="min-height: 100px">
          <BotSimpleAuth v-if="MetodoLogin === 'pw'" />
          <BotCertificado v-else-if="MetodoLogin === 'cert'" />
        </BCol>
      </div>

      <div class="d-flex flex-column mt-auto">
        <hr />
        <BButton type="submit" variant="outline-success">
          <span class="fw-bold"> Salvar </span>
        </BButton>
      </div>
    </BForm>
  </BModal>
</template>
