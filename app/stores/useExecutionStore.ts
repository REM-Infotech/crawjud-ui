export default defineStore("useExecutionStore", () => {
  const listagemExecucoes: Ref<Execucao[]> = ref<Execucao[]>([]);
  const queryExecucao: Ref<string> = ref("");
  const execucoes: ComputedRef<Execucao[]> = computed(() =>
    listagemExecucoes.value.filter((item) =>
      item.pid.toLowerCase().includes(queryExecucao.value.toLowerCase()),
    ),
  );

  async function listar_execucoes(): Promise<void> {
    try {
      const response = await api.get<ExecucoesPayload>("/bot/execucoes");
      listagemExecucoes.value = response.data;
    } catch {}
  }
  return { execucoes, queryExecucao, listar_execucoes };
});
