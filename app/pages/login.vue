<script setup lang="ts">
const FormLogin = reactive({
  username: "",
  password: "",
});

function pushDashboard() {
  useRouter().push({ name: "dashboard" });
}

onMounted(async () => {
  const { create } = useToast();

  create({
    title: "Mensagem",
    body: "Recuperando sessão",
    variant: "primary",
  });

  let jwt: boolean = false;
  await new Promise((resolve, reject) =>
    setTimeout(async () => {
      try {
        jwt = await window.electronAPI.isJwtToken();
        resolve(null);
      } catch {
        reject();
      }
    }, 1000),
  );

  if (jwt) {
    create({
      title: "Sucesso",
      body: "Sessão válida recuperada!",
      variant: "success",
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    pushDashboard();
  }
});

const toast = useToast();
const isCapsOn = ref(false);
async function handleLogin(event: Event) {
  event.preventDefault();
  const load = useLoad();
  load.show();
  const authenticated = await window.electronAPI.authenticateUser(
    FormLogin.username,
    FormLogin.password,
  );
  if (authenticated) {
    pushDashboard();
  }
  toast.create({
    title: authenticated ? "Success" : "Error",
    body: authenticated ? "You have been logged in successfully." : "Invalid username or password.",
    variant: authenticated ? "success" : "danger",
  });
  load.hide();
}

function capsLockIndicator(e: Event) {
  isCapsOn.value = (e as KeyboardEvent).getModifierState("CapsLock");
}
</script>

<template>
  <Container :main-class="'login-container'">
    <div class="card-login">
      <h2>Login</h2>
      <form @submit="handleLogin">
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
