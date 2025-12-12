export default defineStore("useBotForm", () => {
  const progressBarValue = ref(0);
  const fileNs = socketio.socket("/files");
  const seed = ref("");
  const isFileUploading = computed(() => progressBarValue.value > 0);
  const current = ref<BotInfo>({} as BotInfo);
  const FormBot = reactive<formBot>({
    timezone: null,
    xlsx: null,
    anexos: null,
    credencial: null,

    cpf_cnpj_certificado: null,
    certificado: null,
    senha_certificado: null,

    kdbx: null,
    senha_kdbx: null,

    senha_token: null,
    configuracao_form: null,
    sid_filesocket: null,
    bot_id: null,
  });

  return { seed, FormBot, current, fileNs, progressBarValue, isFileUploading };
});
