<script setup lang="ts">
import AppToast from "./components/AppToast.vue";

const { loadTheme } = useThemeStore();

onBeforeMount(loadTheme);
</script>

<template>
  <div class="window-box" />
  <BApp>
    <Loading />
    <AppToast />
    <NuxtLayout />
  </BApp>
</template>
