export default defineStore("useToasti", {
  state: () => ({ active: false, message: "", type: "info", title: "Mensagem" }),

  actions: {
    show(
      opt: toastOptions = { title: "Mensagem", message: "Mensagem", timeout: 2000, type: "info" },
    ) {
      const { title, message, timeout, type } = opt;
      this.message = message;
      this.title = title || "info";
      this.type = type;
      this.active = true;

      setTimeout(() => {
        this.message = "";
        this.title = "";
        this.type = "";
        this.active = false;
      }, timeout);
    },
  },
});
