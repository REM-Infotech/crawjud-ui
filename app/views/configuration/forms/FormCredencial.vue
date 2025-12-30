<script setup lang="ts">
const novaCredencial = defineModel<boolean>();

const load = useLoad();
const toast = useToast();

function validarCampos(campos: { campo: any; mensagem: string }[]): boolean {
  for (const { campo, mensagem } of campos) {
    if (!campo) {
      toast.create({ title: "Erro", body: mensagem });
      load.hide();
      return false;
    }
  }
  return true;
}

function ValidarLoginESenha() {
  return validarCampos([
    { campo: FormCredencial.login, mensagem: "É necessário informar o login do sistema!" },
    { campo: FormCredencial.password, mensagem: "É necessário informar a senha do sistema!" },
  ]);
}

function ValidarCertificado() {
  return validarCampos([
    { campo: FormCredencial.certificado, mensagem: "Necessário enviar o certificado!" },
    {
      campo: FormCredencial.cpf_cnpj_certificado,
      mensagem: "Necessário identificação do certificado!",
    },
    { campo: FormCredencial.senha_certificado, mensagem: "Necessário senha do certificado!" },
  ]);
}

function ValidaDuploFator() {
  return validarCampos([{ campo: FormCredencial.otp, mensagem: "É necessário informar o OTP!" }]);
}

async function handleSubmit(ev: Event) {
  load.show();
  ev.preventDefault();

  if (
    !validarCampos([
      { campo: FormCredencial.nome_credencial, mensagem: "É necessário informar o nome!" },
      { campo: FormCredencial.sistema, mensagem: "É necessário informar o sistema!" },
      { campo: FormCredencial.login_metodo, mensagem: "É necessário informar o método de login!" },
    ])
  )
    return;

  if (FormCredencial.login_metodo === "pw" && !ValidarLoginESenha()) return;
  if (FormCredencial.login_metodo === "cert" && !ValidarCertificado()) return;
  if (FormCredencial.requer_duplo_fator && !ValidaDuploFator()) return;

  await new Promise((resolve) => setTimeout(resolve, 500));

  let message = `Erro ao cadastrar credencial "${FormCredencial.nome_credencial}"`;
  let message_type = "Erro";
  try {
    const response = await api.post("/admin/cadastro_credencial", FormCredencial, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      message_type = "Sucesso!";
      message = `Credencial "${FormCredencial.nome_credencial}" cadastrada!`;
    }
  } catch {}

  toast.show({
    title: message_type,
    body: message,
  });

  load.hide();

  novaCredencial.value = false;
}

const credencialFormStore = useCredencialFormStore();
const { FormCredencial } = credencialFormStore;
const { login_metodo } = storeToRefs(credencialFormStore);

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
            <BFormInput v-model="FormCredencial.nome_credencial" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
          <BFormGroup label="sistema">
            <BFormSelect v-model="FormCredencial.sistema" :options="opcoesSistema" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
          <BFormGroup label="Método de autenticação">
            <BFormSelect v-model="FormCredencial.login_metodo" :options="opcoesTipoCredencial" />
          </BFormGroup>
        </BCol>
        <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="p-3" style="min-height: 100px">
          <BotSimpleAuth v-if="login_metodo === 'pw'" />
          <BotCertificado v-else-if="login_metodo === 'cert'" />
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
