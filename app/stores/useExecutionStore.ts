import MessageArquivo from "~/components/MessageArquivo.vue";

export default defineStore("useExecutionStore", () => {
  const toast = useToast();
  const Arquivo = ref({
    nome: "",
    path: "",
  });
  const botNs = socketio.socket("/bot");
  const execucaoBot: Ref<string> = ref("");
  const querySistema: Ref<string> = ref("");
  const queryExecucao: Ref<string> = ref("");
  const execucao = ref<Execucao>({} as Execucao);
  const logs: Ref<Message[]> = ref<Message[]>([]);
  const listagemExecucoes: Ref<Execucao[]> = ref<Execucao[]>([]);
  const itemLog: Ref = ref<Element | ComponentPublicInstance | null>(null); // Ref para o ul
  const logsExecucao: ComputedRef<Message[]> = computed(() => logs.value);
  const execucoes: ComputedRef<Execucao[]> = computed(() =>
    listagemExecucoes.value.filter((item) => {
      if (!querySistema.value) {
        return item.pid.toLowerCase().includes(queryExecucao.value.toLowerCase());
      }
      return item.bot === querySistema.value;
    }),
  );

  async function pushLog(msg: Message) {
    logs.value = [...logs.value, msg];
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async function pushLogs(msgs: Message[]) {
    for (const msg of msgs) {
      if (!botNs.connected) return;
      await new Promise((resolve) => setTimeout(resolve, 500));
      logs.value = [...logs.value, msg];
    }
  }

  async function encerrar_execucao(pid: string) {
    botNs.emit("bot_stop", { pid: pid });
  }

  async function download_execucao(pid: string) {
    const { show, hide } = useLoad();
    botNs.emit("bot_stop", { pid: pid });
    show();
    try {
      const endpoint = `/bot/execucoes/${pid}/download`;
      const response = await api.get<PayloadDownloadExecucao>(endpoint);
      if (response.status === 200) {
        const result = await window.fileService.downloadExecucao(response.data);
        if (result) {
          Arquivo.value = {
            nome: response.data.file_name,
            path: result,
          };
          const render = h(MessageArquivo, { filePath: result as string });
          toast.create({
            title: "Info",
            slots: {
              default: () => render,
            },
            modelValue: 2500,
          });
        }
      }
    } catch {
      toast.create({ title: "Erro", body: "Não foi possivel baixar execução" });
    }

    hide();
  }

  async function listar_execucoes(): Promise<void> {}

  watch(execucao, (newV) => {
    execucaoBot.value = newV?.pid as string;
    logs.value = [];
    botNs.emit("join_room", { room: execucaoBot.value }, pushLogs);
  });

  botNs.on("logbot", async (data: Message) => {
    await pushLog(data);
  });

  return {
    // 1. Estados reativos
    execucao,
    execucaoBot,
    execucoes,
    itemLog,
    listagemExecucoes,
    logs,
    logsExecucao,
    queryExecucao,
    querySistema,

    // 2. Ações
    download_execucao,
    encerrar_execucao,
    listar_execucoes,
    pushLog,

    // 3. Utilitários
    botNs,
    Arquivo,
  };
});
