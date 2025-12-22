<script setup lang="tsx">
const usuariosRef: Ref<UsuarioItem[]> = ref([]);
const usuarios: ComputedRef<UsuarioItem[]> = computed(() => usuariosRef.value);

const { adminNamespace } = useAdminStore();

onMounted(() => {
  adminNamespace.emit("listagem_usuarios", (data: UsuarioItem[]) => {
    usuariosRef.value = data;
  });
});

const model = ref(false);
</script>

<template>
  <div id="usuarios-view" class="card">
    <BModal no-footer centered size="lg" header-class="fs-3" v-model="model">
      <template #header>
        <span class="fw-bold"> Novo usuário </span>
      </template>

      <BForm>
        <div class="row">
          <BFormGroup label="Nome">
            <BFormInput />
          </BFormGroup>
        </div>
      </BForm>
    </BModal>

    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h4 id="Usuario-branding-text" class="align-text-center">Usuarios</h4>
        <BButton variant="outline-success" @click="model = true">
          <span class="fw-bold"> Novo Usuário </span>
        </BButton>
      </div>
    </div>
    <div class="card-body bg-secondary bg-opacity-50">
      <table class="table table table-striped" style="height: 50dvh">
        <thead>
          <tr>
            <th scope="col">
              <span class="fw-bold"> # </span>
            </th>
            <th scope="col">
              <span> Nome Usuário </span>
            </th>
            <th scope="col">
              <span> Login </span>
            </th>
            <th scope="col">
              <span> Email </span>
            </th>
            <th scope="col">
              <span> Último Login </span>
            </th>
            <th scope="col">
              <span> Ações </span>
            </th>
          </tr>
        </thead>

        <TransitionGroup tag="tbody" name="usuarios-listagem" mode="out-in">
          <tr v-for="(Usuario, idx) in usuarios" :key="idx">
            <th scope="row">
              {{ Usuario.Id }}
            </th>
            <td>
              {{ Usuario.nome_Usuario }}
            </td>
            <td>
              {{ Usuario.login_usuario }}
            </td>
            <td>
              {{ Usuario.email }}
            </td>
            <td>
              {{ Usuario.ultimo_login }}
            </td>
            <td>
              <component :is="Usuario.acoesComponent" />
            </td>
          </tr>
          <tr v-if="usuarios.length === 0">
            <td colspan="6" class="text-center fw-bold">Carregando</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
#usuarios-view {
  min-width: 100%;
  min-height: 100%;
}

#usuario-branding-text {
  color: white !important;
}

.usuarios-listagem-enter-active,
.usuarios-listagem-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.usuarios-listagem-enter-from,
.usuarios-listagem-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
