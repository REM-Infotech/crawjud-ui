export default defineStore("useExecutionStore", () => {
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
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  async function pushLogs(msgs: Message[]) {
    for (const msg of msgs) {
      await pushLog(msg);
    }
  }

  async function encerrar_execucao(pid: str) {
    botNs.emit("bot_stop", { pid: pid });
  }

  async function download_execucao(pid: str) {
    const { toggle } = useLoad();

    toggle();
    alert(pid);
    toggle();
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
  };
});
