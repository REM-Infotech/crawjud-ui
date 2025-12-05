<script setup lang="ts">
import { storeToRefs } from "pinia";

const { progressBar, botForm } = storeToRefs(botStore());

const PJeFileAuth = reactive<RecordPJeFileAuthForm>({
  PlanilhaXlsx: undefined,
  certificado: undefined,
  SenhaCertificado: "",
});

const XlsxFileUpload = ref(false);
const CertificadoUpload = ref(false);

onMounted(() => {
  botForm.value = PJeFileAuth;
});

watch(
  () => PJeFileAuth.PlanilhaXlsx,
  async (newVal) => {
    XlsxFileUpload.value = true;
    await FormManager.uploadXlsx(newVal);
    XlsxFileUpload.value = false;
  },
);

watch(
  () => PJeFileAuth.certificado,
  async (newVal) => {
    CertificadoUpload.value = true;
    await FormManager.uploadXlsx(newVal);
    CertificadoUpload.value = false;
  },
);

watch(PJeFileAuth, (newValue) => {
  botForm.value = newValue;
});
</script>

<template>
  <div class="row g-2 p-3">
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Planilha Xlsx" class="mb-2" label-size="lg">
          <BFormFile
            :disabled="progressBar > 0"
            v-model="PJeFileAuth.PlanilhaXlsx"
            class="mt-3"
            size="lg"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </BFormGroup>
        <Transition name="page" mode="in-out">
          <div v-if="progressBar > 0 && XlsxFileUpload" class="d-grid">
            <BProgress :value="progressBar" :max="100" />
          </div>
        </Transition>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Certificado Digital" class="mb-2" label-size="lg">
          <BFormFile
            :disabled="progressBar > 0"
            v-model="PJeFileAuth.certificado"
            class="mt-3"
            size="lg"
            :accept="['application/x-pkcs12', '.pfx']"
          />
        </BFormGroup>
        <Transition name="page" mode="in-out">
          <div v-if="progressBar > 0 && CertificadoUpload" class="d-grid">
            <BProgress :value="progressBar" :max="100" />
          </div>
        </Transition>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 6.5rem">
        <BFormFloatingLabel label="Senha Certificado" label-for="floatingEmail" class="my-2">
          <BFormInput
            id="floatingEmail"
            type="password"
            placeholder="Senha do certificado"
            v-model="PJeFileAuth.SenhaCertificado"
          />
        </BFormFloatingLabel>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12"> </BCol>
  </div>
</template>
