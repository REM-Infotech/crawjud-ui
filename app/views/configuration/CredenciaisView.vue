<script setup lang="tsx">
interface CredencialItem {
  Id: number;
  nome_credencial: string;
  tipo_autenticacao: string;
  acoesComponent: Component;
}

const credenciaisRef: Ref<CredencialItem[]> = ref([]);
const credenciais: ComputedRef<CredencialItem[]> = computed(() => credenciaisRef.value);
</script>

<template>
  <div id="credenciais-view" class="card">
    <div class="card-header">
      <h4 id="credencial-branding-text" class="align-text-center">Credenciais</h4>
    </div>
    <div class="card-body bg-secondary bg-opacity-50">
      <table class="table table table-striped table-secondary">
        <thead>
          <tr>
            <th scope="col">
              <span class="fw-bold"> # </span>
            </th>
            <th scope="col">
              <span> Nome Credencial </span>
            </th>
            <th scope="col">
              <span> Tipo Autenticacao </span>
            </th>
            <th scope="col">
              <span> Ações </span>
            </th>
          </tr>
        </thead>

        <TransitionGroup tag="tbody">
          <tr v-for="(credencial, idx) in credenciais" :key="idx">
            <th scope="row">
              {{ credencial.Id }}
            </th>
            <td>
              {{ credencial.nome_credencial }}
            </td>
            <td>
              {{ credencial.tipo_autenticacao }}
            </td>
            <td>
              <component :is="credencial.acoesComponent" />
            </td>
          </tr>
          <tr v-if="credenciais.length === 0">
            <td colspan="6" class="text-center fw-bold">Nenhuma Credencial Encontrada</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
#credenciais-view {
  min-width: 100%;
  min-height: 100%;
}

#credencial-branding-text {
  color: white !important;
}
</style>
