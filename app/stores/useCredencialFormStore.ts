export default defineStore("useCredencialFormStore", () => {
  const FormCredencial = reactive<formCredencial>({
    nome_credencial: null,

    sistema_credencial: null,
    metodo_login: null,

    username: null,
    password: null,

    certificado: null,
    cpf_cnpj_certificado: null,
    senha_certificado: null,

    otp_uri: null,
    requer_duplo_fator: false,
  });

  const metodo_login = computed(() => FormCredencial.metodo_login);
  const SistemaCredencial = computed(() => FormCredencial.sistema_credencial);

  return { FormCredencial, metodo_login, SistemaCredencial };
});
