export default defineStore("useCredencialFormStore", () => {
  const FormCredencial = reactive<formCredencial>({
    nome_credencial: null,

    sistema: null,
    login_metodo: null,

    login: null,
    password: null,

    certificado: null,
    cpf_cnpj_certificado: null,
    senha_certificado: null,

    otp: null,
    requer_duplo_fator: false,
  });

  const login_metodo = computed(() => FormCredencial.login_metodo);
  const SistemaCredencial = computed(() => FormCredencial.sistema);

  return { FormCredencial, login_metodo, SistemaCredencial };
});
