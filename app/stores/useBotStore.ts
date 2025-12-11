export default defineStore("useListageRobo", {
  state: () => ({
    listagem: [] as BotInfo[],
    credenciais: [{ value: null, text: "Selecione" }] as CredenciaisSelect[],
  }),

  actions: {
    async listar_robos() {
      try {
        const listagem = (await api.get<BotPayload>("/bot/listagem")).data.listagem;
        this.listagem = listagem;
      } catch {}
    },
    async listar_credenciais(bot: BotInfo) {
      try {
        const sistema = bot.sistema.toLowerCase();
        const credenciais = (await api.get<CredenciaisPayload>(`/bot/${sistema}/credenciais`)).data
          .credenciais;

        this.credenciais = [{ value: null, text: "Selecione" }, ...credenciais];
      } catch (err) {
        console.log(err);
      }
    },
    resetCredenciais() {
      this.credenciais = [{ value: null, text: "Selecione" }];
    },
  },
});
