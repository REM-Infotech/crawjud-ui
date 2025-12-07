<script setup lang="ts">
import AppToast from "./components/AppToast.vue";

const { loadTheme } = useThemeStore();

onBeforeMount(loadTheme);
</script>

<template>
  <BApp>
    <div class="window-box" />
    <Loading />
    <AppToast />
    <NuxtLayout />
  </BApp>
</template>
