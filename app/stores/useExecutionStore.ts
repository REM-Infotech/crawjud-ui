export default defineStore("useExecutionStore", () => {
  const logNs = socketio.socket("/bot_logs");
  const itemLog: elementRef = ref<Element | ComponentPublicInstance | null>(null); // Ref para o ul
  const execucao = ref<Execucao>({} as Execucao);
  const queryExecucao: Ref<string> = ref("");
  const execucaoBot: Ref<string> = ref("");
  const listagemExecucoes: Ref<Execucao[]> = ref<Execucao[]>([]);
  const logs: Ref<Message[]> = ref<Message[]>([]);
  const logsExecucao: ComputedRef<Message[]> = computed(() => logs.value);
  const execucoes: ComputedRef<Execucao[]> = computed(() =>
    listagemExecucoes.value.filter((item) =>
      item.pid.toLowerCase().includes(queryExecucao.value.toLowerCase()),
    ),
  );
  async function pushLog(msg: Message) {
    const currentLogs = logs.value;
    currentLogs.push(msg);
    await new Promise((resolve) => setTimeout(resolve, 250));
    logs.value = currentLogs;
  }
  async function pushLogs(msgs: Message[]) {
    for (const msg of msgs) {
      await pushLog(msg);
    }
  }

  async function encerrar_execucao(pid: str) {
    logNs.emit("bot_stop", { pid: pid });
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async function listar_execucoes(): Promise<void> {
    try {
      const response = await api.get<ExecucoesPayload>("/bot/execucoes");
      listagemExecucoes.value = response.data;
    } catch {}
  }
  logNs.on("connect", async () => {
    logs.value = [];
    await new Promise((resolve) => setTimeout(resolve, 500));
    logNs.emit("join_room", { room: execucaoBot.value }, pushLogs);
  });
  logNs.on("logbot", pushLog);

  watch(execucao, (newV) => {
    execucaoBot.value = newV?.pid as string;
  });

  watch(execucaoBot, async () => {
    if (logNs.connected) {
      logs.value = [];
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logNs.disconnect();
    }
    logNs.connect();
  });

  return {
    execucoes,
    queryExecucao,
    pushLog,
    listar_execucoes,
    execucaoBot,
    logsExecucao,
    logNs,
    logs,
    encerrar_execucao,
    execucao,
    itemLog,
  };
});
