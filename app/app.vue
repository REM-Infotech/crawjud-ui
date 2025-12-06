<script setup lang="ts">
import AppToast from "./components/AppToast.vue";
</script>
<template>
  <div class="window-box" />
  <BApp>
    <Loading />
    <AppToast />
    <NuxtLayout />
  </BApp>
</template>
