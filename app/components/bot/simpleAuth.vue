<script setup lang="ts">
const credencialFormStore = useCredencialFormStore();
const { FormCredencial } = credencialFormStore;
</script>

<template>
  <div class="mb-3 p-3 border border-secondary border-1 rounded-1">
    <BRow>
      <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
        <BFormGroup label="Login sistema">
          <BFormInput v-model="FormCredencial.login" />
        </BFormGroup>
      </BCol>
      <BCol md="12" sm="12" lg="12" xl="12" xxl="12" class="mb-3">
        <BFormGroup label="Senha sistema">
          <AppInputPassword
            v-model="FormCredencial.password"
            id="password"
            placeholder="Senha sistema"
          />
        </BFormGroup>
      </BCol>
    </BRow>
    <AppOtpInput />
  </div>
</template>
