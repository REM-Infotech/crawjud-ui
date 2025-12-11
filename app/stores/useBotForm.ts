export default defineStore("useBotForm", () => {
  const progressBarValue = ref(0);
  const fileNs = socketio.socket("/files");
  const seed = ref("");
  const current = ref<BotInfo>({} as BotInfo);
  const FormBot = reactive<formBot>({
    xlsx: null,
    anexos: null,
    credencial: null,
    certificado: null,
    kbdx: null,
    senha_token: null,
    configuracao_form: null,
    sid_filesocket: "",
    bot_id: 0,
  });

  return { seed, FormBot, current, fileNs, progressBarValue };
});
