export default defineStore("useExecutionStore", () => {
  async function listar_execucoes() {
    try {
      const response = await api.get<ExecucoesPayload[]>("/bot/execucoes");
    } catch {}
  }
});
