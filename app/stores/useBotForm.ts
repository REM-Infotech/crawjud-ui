export default defineStore("useBotForm", () => {
  const selects = reactive({
    enviaXlsx: false,
    enviaAnexos: false,
    needCredencial: false,
    needSenhaToken: true,
    enviaCertificado: true,
    enviaKbdx: true,
  });

  const current = ref<BotInfo>({} as BotInfo);
  const FormBot = reactive<formBot>({
    xlsx: null,
    anexos: null,
    credencial: null,
    certificado: null,
    kbdx: null,
    senha_token: null,
    configuracao_form: null,
  });

  return { selects, FormBot, current };
});
