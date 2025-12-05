import { isAxiosError } from "axios";

class Authentication {
  constructor() {}

  async login(form: FormLogin) {
    const { $router } = useNuxtApp();

    try {
      const resp = await api.post("/auth/login", form);

      if (!resp) {
        notify.show({
          title: "Erro!",
          message: "Erro ao realizar login",
          type: "error",
          duration: 4000,
        });
        return;
      } else if (resp.data && resp.data.message) {
        notify.show({
          title: "Sucesso!",
          message: String(resp.data?.message),
          type: "success",
          duration: 2000,
        });
        $router.push({ name: "dashboard" });
        await window.electronAPI.salvarSenha(form.login, form.password);
      }
    } catch (err) {
      alert(err);
      if (isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          notify.show({
            title: "Erro!",
            message: String(err.response.data.message),
            type: "error",
            duration: 4000,
          });
        }
      }
    }
  }

  async logout() {
    const { $router } = useNuxtApp();

    try {
      await api.post("/auth/logout");
    } catch {
      //
    }
    notify.show({
      type: "info",
      title: "Info",
      message: "Sessão encerrada!",
      duration: 2000,
    });
    $router.push({ name: "login" });
  }
}

export default new Authentication();
