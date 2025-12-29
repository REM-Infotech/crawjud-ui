export default defineStore("useCredencialFormStore", () => {
  const FormCredencial = reactive({
    nomeCredencial: null,

    Sistema: null,
    MetodoLogin: null,

    username: null,
    password: null,

    certificado: null,
    cpf_cnpj_certificado: null,

    otp_uri: null,
  });

  const MetodoLogin = computed(() => FormCredencial.MetodoLogin);
  const SistemaCredencial = computed(() => FormCredencial.Sistema);

  return { FormCredencial, MetodoLogin, SistemaCredencial };
});
