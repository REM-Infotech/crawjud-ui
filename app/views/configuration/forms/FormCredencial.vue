<script setup lang="ts">
const novaCredencial = defineModel<boolean>();

function handleSubmit(ev: Event) {
  ev.preventDefault();
}

const credencialFormStore = useCredencialFormStore();
const { FormCredencial } = credencialFormStore;
const { MetodoLogin } = storeToRefs(credencialFormStore);

const opcoesTipoCredencial: OpcoesTipoCredencial[] = [
  { value: null, text: "Selecione uma opção", disabled: true },
  { value: "pw", text: "Usuário e Senha" },
  { value: "cert", text: "Certificado" },
];

const opcoesSistema: OpcoesSistema[] = [
  { value: null, text: "Selecione uma opção", disabled: true },
  { value: "PROJUDI", text: "PROJUDI" },
  { value: "ESAJ", text: "ESAJ" },
  { value: "ELAW", text: "ELAW" },
  { value: "JUSDS", text: "JUSDS" },
  { value: "PJE", text: "PJE" },
  { value: "CSI", text: "CSI" },
];
</script>

<template>
  <BModal no-footer centered size="lg" header-class="fs-4" v-model="novaCredencial">
    <template #header>
      <span class="fw-bold"> Nova credencial </span>
    </template>

    <BForm @submit="handleSubmit">
      <div class="row gap-1 justify-content-center">
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
          <BFormGroup label="Nome Credencial">
            <BFormInput v-model="FormCredencial.nomeCredencial" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
          <BFormGroup label="Sistema">
            <BFormSelect v-model="FormCredencial.Sistema" :options="opcoesSistema" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
          <BFormGroup label="Método de autenticação">
            <BFormSelect v-model="FormCredencial.MetodoLogin" :options="opcoesTipoCredencial" />
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
