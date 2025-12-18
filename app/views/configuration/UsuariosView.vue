<script setup lang="tsx">
interface UsuarioItem {
  Id: number;
  nome_Usuario: string;
  login_usuario: string;
  email: string;
  ultimo_login: string;
  acoesComponent: Component;
}

const usuariosRef: Ref<UsuarioItem[]> = ref([]);

const usuarios: ComputedRef<UsuarioItem[]> = computed(() => usuariosRef.value);
</script>

<template>
  <div id="usuarios-view" class="card">
    <div class="card-header">
      <h4 id="Usuario-branding-text" class="align-text-center">Usuarios</h4>
    </div>
    <div class="card-body bg-secondary bg-opacity-50">
      <table class="table table table-striped table-secondary">
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

        <TransitionGroup tag="tbody">
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
            <td colspan="6" class="text-center fw-bold">Nenhum usuário encontrado</td>
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
</style>
