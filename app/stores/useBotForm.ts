export default defineStore("useBotForm", () => {
  const { $fileNs: fileNs } = useNuxtApp();
  const progressBarValue = ref(0);
  const seed = ref("");
  const isFileUploading = computed(() => progressBarValue.value > 0);
  const current = ref<CrawJudBot>({} as CrawJudBot);
  const FormBot = reactive<formBot>({
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

  return {
    // Estados reativos
    FormBot,
    current,
    progressBarValue,
    seed,

    // Ações

    // Utilitários
    fileNs,
    isFileUploading,
  };
});
