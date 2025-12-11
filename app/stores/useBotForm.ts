export default defineStore("useBotForm", () => {
  const selects = reactive({
    enviaXlsx: false,
    enviaAnexos: false,
    needCredencial: false,
    needSenhaToken: true,
    enviaCertificado: true,
    enviaKbdx: true,
  });

  const computedNeedInputs = computed(() => selects);
  const FormBot = reactive<formBot>({
    xlsx: null,
    anexos: null,
    credencial: null,
    certificado: null,
    kbdx: null,
    senha_token: null,
  });

  return { selects, FormBot };
});
