<script setup lang="ts">
import { storeToRefs } from "pinia";

const { progressBar, botForm } = storeToRefs(botStore());

const PJeForm = reactive<RecordPJeProtocoloForm>({
  PlanilhaXlsx: undefined,
  Anexos: undefined,
  certificado: undefined,
  SenhaCertificado: "",
});

const CertificadoUpload = ref(false);
const XlsxFileUpload = ref(false);
const OutrosArquivosUpload = ref(false);

onMounted(() => {
  botForm.value = PJeForm;
});

watch(
  () => PJeForm.PlanilhaXlsx,
  async (newVal) => {
    XlsxFileUpload.value = true;
    await FormManager.uploadXlsx(newVal);
    XlsxFileUpload.value = false;
  },
);
watch(
  () => PJeForm.Anexos,
  async (newVal) => {
    OutrosArquivosUpload.value = true;
    await FormManager.uploadMultipleFiles(newVal);
    OutrosArquivosUpload.value = false;
  },
);

watch(
  () => PJeForm.certificado,
  async (newVal) => {
    CertificadoUpload.value = true;
    await FormManager.uploadXlsx(newVal);
    CertificadoUpload.value = false;
  },
);

watch(PJeForm, (newValue) => (botForm.value = newValue));
</script>

<template>
  <div class="row g-2 p-3">
    <BCol md="12" lg="12" xl="12" sm="12">
      <div class="container-fluid rounded rounded-4 border p-3" style="height: 8.5rem">
        <BFormGroup label="Planilha Xlsx" class="mb-2" label-size="lg">
          <BFormFile
            :disabled="progressBar > 0"
            v-model="PJeForm.PlanilhaXlsx"
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
        <BFormGroup label="Anexos" class="mb-2" label-size="lg">
          <BFormFile
            :disabled="progressBar > 0"
            multiple
            v-model="PJeForm.Anexos"
            class="mt-3"
            size="lg"
            accept="application/pdf"
          />
        </BFormGroup>
        <Transition name="page" mode="in-out">
          <div v-if="progressBar > 0 && OutrosArquivosUpload" class="d-grid">
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
            v-model="PJeForm.certificado"
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
        <BFormFloatingLabel label="Senha Certificado" label-for="" class="my-2">
          <BFormInput
            id="floatingEmail"
            type="password"
            placeholder="Senha do certificado"
            v-model="PJeForm.SenhaCertificado"
          />
        </BFormFloatingLabel>
      </div>
    </BCol>
    <BCol md="12" lg="12" xl="12" sm="12"> </BCol>
  </div>
</template>
