export default defineStore("useListageRobo", {
  state: () => ({ data: [] as BotInfo[] }),

  actions: {
    async listagem() {
      this.data = await window.botApi.listagemBots();
      console.log(this.data);
    },
  },
});
