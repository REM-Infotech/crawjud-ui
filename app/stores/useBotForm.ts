export default defineStore("useBotForm", () => {
  const progressBarValue = ref(0);
  const fileNs = socketio.socket("/files");
  const seed = ref("");
  const isFileUploading = computed(() => progressBarValue.value > 0);
  const current = ref<BotInfo>({} as BotInfo);
  const FormBot = reactive<formBot>({
    xlsx: null,
    anexos: null,
    credencial: null,

    certificado: null,
    senha_certificado: null,

    kbdx: null,
    senha_kbdx: null,

    senha_token: null,
    configuracao_form: null,
    sid_filesocket: null,
    bot_id: null,
  });

  return { seed, FormBot, current, fileNs, progressBarValue, isFileUploading };
});
