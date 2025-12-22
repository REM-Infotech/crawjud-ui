<script setup lang="tsx">
const usuariosRef: Ref<UsuarioItem[]> = ref([]);
const usuarios: ComputedRef<UsuarioItem[]> = computed(() => usuariosRef.value);

const toast = useToast();
const load = useLoad();
const { adminNamespace } = useAdminStore();

onMounted(() => {
  adminNamespace.emit("listagem_usuarios", (data: UsuarioItem[]) => {
    usuariosRef.value = data;
  });
});

const modal = ref(false);

async function handleSubmit(ev: Event) {
  ev.preventDefault();
  load.show();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  modal.value = false;
  load.hide();

  await new Promise((resolve) => setTimeout(resolve, 250));

  toast.create({
    title: "Info",
    body: "Usuário cadastrado com sucesso!",
  });
}
</script>

<template>
  <div id="usuarios-view" class="card">
    <BModal no-footer centered size="lg" header-class="fs-4" v-model="modal">
      <template #header>
        <span class="fw-bold"> Novo usuário </span>
      </template>

      <BForm @submit="handleSubmit">
        <div class="row gap-3">
          <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
            <BFormGroup label="Nome">
              <BFormInput />
            </BFormGroup>
          </BCol>
          <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
            <BFormGroup label="Username">
              <BFormInput />
            </BFormGroup>
          </BCol>
          <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
            <BFormGroup label="E-mail">
              <BFormInput />
            </BFormGroup>
          </BCol>
          <BCol md="12" sm="12" lg="12" xl="12" xxl="12">
            <BRow>
              <BCol md="6" sm="6" lg="6" xl="6" xxl="6">
                <BFormGroup label="Senha">
                  <BFormInput />
                </BFormGroup>
              </BCol>

              <BCol md="6" sm="6" lg="6" xl="6" xxl="6">
                <BFormGroup label="Repetir Senha">
                  <BFormInput />
                </BFormGroup>
              </BCol>
            </BRow>
          </BCol>
        </div>

        <div class="d-flex flex-column mt-auto">
          <hr />
          <BButton type="submit" variant="outline-success">
            <span class="fw-bold"> Salvar </span>
          </BButton>
        </div>
      </BForm>
    </BModal>

    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h4 id="Usuario-branding-text" class="align-text-center">Usuarios</h4>
        <BButton variant="outline-success" @click="modal = true">
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
