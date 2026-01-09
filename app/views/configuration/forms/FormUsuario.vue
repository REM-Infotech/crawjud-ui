<script setup lang="ts">
const modal = defineModel<boolean>();
const load = useLoad();
const toast = useToast();

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
  <BModal @hide="modal = false" no-footer centered size="lg" header-class="fs-4" v-model="modal">
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
</template>
