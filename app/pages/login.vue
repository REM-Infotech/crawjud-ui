<script setup lang="ts">
import { isAxiosError, type AxiosResponse } from "axios";

const { $api: api } = useNuxtApp();
const FormLogin = reactive({
  username: "",
  password: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const toast = useToast();
const load = useLoad();
const recuperandoSessao = ref(true);

class authService {
  static async authUser(e: SubmitEvent) {
    e.preventDefault();
    load.show();

    if (!FormLogin.username || !FormLogin.password) {
      const message = !FormLogin.username ? "Informe um usuário" : "Informe a senha!";
      load.hide();
      toast.create({
        title: "Erro",
        body: message,
      });
      return;
    }

    try {
      const response = await api.post("/auth/login", FormLogin);
      if (response.status === 200) {
        toast.create({
          title: "Sucesso!",
          body: "Login efetuado com sucesso!",
          value: 1000,
        });
        useRouter().push({ name: "robot-listagem" });
      }
    } catch (err) {
      console.log(err);
      if (isAxiosError(err) && err.response) {
        const message = (err.response as AxiosResponse<AuthPayload>).data.message;
        toast.create({
          title: "Erro",
          body: message,
        });
      }
    }
    load.hide();
  }
}

onMounted(async () => {
  const tst = toast.create({
    title: "Info",
    body: "Recuperando sessão salva",
    modelValue: true,
  });
  let message = "Nenhuma sessão encontrada!";
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { $hasCookie } = useNuxtApp();

  load.show();

  if ($hasCookie) {
    message = "Sessão recuperada!";
    await new Promise((resolve) => setTimeout(resolve, 2000));
    useRouter().push({ name: "robot-listagem" });
  }
  tst.hide();
  toast.create({
    title: "Info",
    body: message,
    modelValue: 2000,
  });

  load.hide();
  recuperandoSessao.value = false;
});
</script>

<template>
  <BContainer class="login-container">
    <div class="card card-login">
      <div class="card-header">
        <h2 class="mb-3">Login</h2>
      </div>
      <div class="card-body">
        <form @submit="(e) => authService.authUser(e)" for="username">
          <BFormGroup class="mb-3">
            <BFormInput
              size="lg"
              placeholder="Login"
              type="text"
              id="username"
              v-model="FormLogin.username"
              :disabled="recuperandoSessao"
            />
          </BFormGroup>

          <div class="mb-3">
            <AppInputPassword
              size="lg"
              id="password"
              placeholder="Senha"
              v-model="FormLogin.password"
              :disabled="recuperandoSessao"
            />
          </div>
          <div class="card-footer">
            <BButton
              type="submit"
              class="btn mt-auto btn-primary w-100"
              :disabled="recuperandoSessao"
              >Login</BButton
            >
          </div>
        </form>
      </div>
    </div>
  </BContainer>
</template>

<style lang="css" scoped>
.login-container {
  margin-top: 13.5em;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-login {
  width: 480px;
  min-height: 330px;
  padding: 15px;
  background-color: var(--color-flirt-950);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

@media (prefers-color-scheme: light) {
  .card-login {
    background-color: var(--color-flirt-200);
  }
  .text-warning {
    color: rgb(78, 52, 4) !important;
  }
}
</style>
