<template>
  <div class="mb-3 p-3 border border-secondary border-1 rounded-1">
    <BRow>
      <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
        <BFormGroup label="Senha">
          <BFormInput />
        </BFormGroup>
      </BCol>
      <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
        <BFormGroup label="Repetir Senha">
          <BFormInput />
        </BFormGroup>
      </BCol>
    </BRow>
    <AppOtpInput />
  </div>
</template>
