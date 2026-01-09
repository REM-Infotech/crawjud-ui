<script setup lang="tsx">
import FormCredencial from "./forms/FormCredencial.vue";

const credenciaisRef: Ref<CredencialItem[]> = ref([]);
const credenciais: ComputedRef<CredencialItem[]> = computed(() => credenciaisRef.value);
const { adminNamespace } = useAdminStore();

const toast = useToast();
const load = useLoad();

onMounted(() => {
  adminNamespace.emit("listagem_credenciais", (data: CredencialItem[]) => {
    credenciaisRef.value = data;
  });
});

const novaCredencial = ref(false);

function formataMetodoLogin(item: CredencialItem) {
  console.log(item);
  if (!item.tipo_autenticacao) return "Usuário / Senha";
  if (item.tipo_autenticacao === "pw") return "Usuário / Senha";
  else if (item.tipo_autenticacao === "certificado" || item.tipo_autenticacao === "cert")
    return "Certificado";
}

async function deletarCredencial(ev: Event, credencial: CredencialItem) {
  ev.preventDefault();
  load.show();
  let args_toast = {
    title: "Erro",
    body: "Erro ao deletar credencial",
  };

  try {
    const response = await api.post("/admin/deletar_credencial", credencial, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      args_toast = {
        title: "Sucesso",
        body: `Credencial "${credencial.nome_credencial}" deletada!`,
      };
    }
  } catch {}

  const new_data = [...credenciaisRef.value].filter((item) => item != credencial);
  credenciaisRef.value = new_data;

  toast.create(args_toast);
  load.hide();
}
</script>

<template>
  <div>
    <FormCredencial v-model="novaCredencial" />
    <div id="credenciais-view" class="card">
      <div class="card-header d-flex justify-content-between">
        <h4 id="credencial-branding-text" class="align-text-center">Credenciais</h4>
        <BButton size="sm" variant="success" @click="novaCredencial = true">
          Cadastrar nova
        </BButton>
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
                    {{ formataMetodoLogin(credencial) }}
                  </td>
                  <td>
                    <BTooltip>
                      <template #target>
                        <BButton
                          @click="(ev: Event) => deletarCredencial(ev, credencial)"
                          variant="outline-danger"
                          size="sm"
                        >
                          <span class="fw-bold"> Deletar </span>
                        </BButton>
                      </template>
                      <span>Apenas opção de deletar para evitar vazamentos</span>
                    </BTooltip>
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
