export default defineStore("useBotStore", () => {
  const mgr = socketio();
  const botNs = mgr.socket("/bot");

  const queryBot = ref("");
  const listagemBots: Ref<CrawJudBot[]> = ref([]);
  const credenciaisBot: Ref<CredenciaisSelect[]> = ref([{ value: null, text: "Selecione" }]);

  const queryLower = computed(() => queryBot.value.toLowerCase());
  const credenciais: ComputedRef<CredenciaisSelect[]> = computed(() => credenciaisBot.value);
  const listagem: ComputedRef<CrawJudBot[]> = computed(() =>
    listagemBots.value.filter(
      (item) =>
        item.display_name.toLowerCase().includes(queryLower.value) ||
        item.sistema.toLowerCase().includes(queryLower.value),
    ),
  );

  botNs.on("connect", () => {
    listagemBots.value = [];
    botNs.emit("listagem", (data: { listagem: CrawJudBot[] }) => {
      console.log(data);
      listagemBots.value = data.listagem;
    });

    const { current } = storeToRefs(useBotForm());
    if (current) listar_credenciais(current.value);
  });

  async function listar_credenciais(bot: CrawJudBot) {
    if (!bot) return;

    credenciaisBot.value = [{ value: null, text: "Carregando" }];
    botNs.emit("provide_credentials", { sistema: bot.sistema }, (data: CredenciaisSelect[]) => {
      credenciaisBot.value = data;
    });
  }

  function resetCredenciais() {
    credenciaisBot.value = [{ value: null, text: "Selecione" }];
  }

  return {
    botNs,
    listar_credenciais,
    listagemBots,
    credenciaisBot,
    credenciais,
    listagem,
    resetCredenciais,
    queryBot,
  };
});
