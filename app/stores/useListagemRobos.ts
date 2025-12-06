export default defineStore("useListageRobo", {
  state: () => ({ data: [] as BotInfo[] }),

  actions: {
    async listagem() {
      this.data = await window.electronAPI.listagemBots();
    },
  },
});
