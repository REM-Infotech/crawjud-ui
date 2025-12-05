<script setup lang="ts">
const FormLogin = reactive({
  username: "",
  password: "",
});

const toast = useToast();

async function handleLogin(event: Event) {
  event.preventDefault();
  const load = useLoad();
  load.show();
  const authenticated = await window.electronAPI.authenticateUser(
    FormLogin.username,
    FormLogin.password,
  );
  if (authenticated) {
    useRouter().push({ name: "dashboard" });
  }
  toast.create({
    title: authenticated ? "Success" : "Error",
    body: authenticated ? "You have been logged in successfully." : "Invalid username or password.",
    variant: authenticated ? "success" : "danger",
  });
  load.hide();
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
          <input type="password" class="form-control" id="password" v-model="FormLogin.password" />
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
  background-color: var(--bg-primary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
