<script setup lang="ts">
import AppToast from "./components/AppToast.vue";
const { loadTheme } = useThemeStore();
const { $botNs: botNs } = useNuxtApp();
onBeforeMount(loadTheme);
watch(
  () => useRoute().name,
  (newV) => {
    if (newV && newV !== "index" && newV !== "login") {
      botNs.connect();
    }
  },
);
</script>

<template>
  <BApp>
    <div class="window-box" />
    <Loading />
    <AppToast />
    <NuxtLayout />
  </BApp>
</template>
