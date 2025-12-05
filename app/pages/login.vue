<script setup lang="ts">
// Define o estado do formulário de login
const FormAuth = reactive<FormLogin>({
  login: "",
  password: "",
  remember: false,
});

onBeforeMount(() => {
  // Checa se o aplicativo é Electron
  const isElectron = typeof window !== "undefined" && !!window.electronAPI;

  if (isElectron) {
    // Se for Electron, define o título da janela
    window.electronAPI.setTitle("CrawJUD - Login");
  }
});

// Executa o login ao submeter o formulário
async function onSubmitted(ev: Event) {
  ev.preventDefault();

  await auth.login(FormAuth);
}

watch(
  () => FormAuth.login,
  async (newLogin) => {
    const isElectron = typeof window !== "undefined" && !!window.electronAPI;

    if (isElectron && newLogin) {
      const savedPassword = await window.electronAPI.carregarSenha(newLogin);
      if (savedPassword) {
        FormAuth.password = savedPassword;
      }
    }
  },
);
</script>

<template>
  <BContainer class="mt-auto mb-auto">
    <div class="card card-login">
      <div class="card-body align-self-center">
        <BForm class="form-signin" @submit="onSubmitted">
          <img class="mb-4" src="/img/crawjud.png" alt="" width="72" />
          <h1 class="h3 mb-3 fw-normal">CrawJUD</h1>
          <div class="form-floating">
            <input
              name="login"
              v-model="FormAuth.login"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model="FormAuth.password"
              name="password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-body-secondary">&copy; 2022–{{ new Date().getFullYear() }}</p>
        </BForm>
      </div>
    </div>
  </BContainer>
</template>

<style lang="css">
.form-signin {
  min-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[name="login"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.container {
  max-width: 420px;
}

.card-login {
  background-color: #240135cb;
}
</style>
