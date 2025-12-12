<script setup lang="ts">
import { isAxiosError, type AxiosResponse } from "axios";

const FormLogin = reactive({
  username: "",
  password: "",
});

const isCapsOn = ref(false);
const toast = useToast();
const load = useLoad();
function capsLockIndicator(e: Event) {
  isCapsOn.value = (e as KeyboardEvent).getModifierState("CapsLock");
}

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
        useRouter().push({ name: "execucoes" });
      }
    } catch (err) {
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
</script>

<template>
  <Container :main-class="'login-container'">
    <div class="card-login">
      <h2>Login</h2>
      <form @submit="(e) => authService.authUser(e)">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="FormLogin.username" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="FormLogin.password"
            @keyup="capsLockIndicator"
          />
          <div v-if="isCapsOn" class="text-warning mt-1 fw-bold" style="font-size: 0.95em">
            Caps Lock is ON
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </Container>
</template>

<style lang="css" scoped>
.login-container {
  display: flex;
  margin-top: 3.5em;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-login {
  width: 400px;
  padding: 30px;
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
