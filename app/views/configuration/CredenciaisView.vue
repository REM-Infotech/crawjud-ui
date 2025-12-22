<script setup lang="tsx">
const credenciaisRef: Ref<CredencialItem[]> = ref([]);
const credenciais: ComputedRef<CredencialItem[]> = computed(() => credenciaisRef.value);

const { adminNamespace } = useAdminStore();

onMounted(() => {
  adminNamespace.emit("listagem_credenciais", (data: CredencialItem[]) => {
    credenciaisRef.value = data;
  });
});
</script>

<template>
  <div id="credenciais-view" class="card">
    <div class="card-header">
      <h4 id="credencial-branding-text" class="align-text-center">Credenciais</h4>
    </div>
    <div class="card-body bg-secondary bg-opacity-50">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
          <table class="table table table-striped" style="height: 50dvh">
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

            <TransitionGroup tag="tbody" name="credenciais">
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
                  <BDropdown variant="outline-secondary" text="Ações" class="me-2">
                    <BDropdownItem variant="primary">
                      <span class="fw-bold"> Editar </span>
                    </BDropdownItem>
                    <BDropdownItem variant="danger">
                      <span class="fw-bold"> Deletar </span>
                    </BDropdownItem>
                  </BDropdown>
                </td>
              </tr>
              <tr v-if="credenciais.length === 0">
                <td colspan="6" class="text-center fw-bold">Carregando</td>
              </tr>
            </TransitionGroup>
          </table>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#credenciais-view {
  max-width: 100%;
  max-height: 100%;
}

#credencial-branding-text {
  color: white !important;
}

.credenciais-enter-active,
.credenciais-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.credenciais-enter-from,
.credenciais-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
