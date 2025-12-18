<script setup lang="ts">
import AppToast from "./components/AppToast.vue";
const { loadTheme } = useThemeStore();
const botNs = socketio.socket("/bot");
onBeforeMount(loadTheme);
watch(
  () => useRoute().name,
  (newV) => {
    if (newV && newV !== "index" && newV !== "login") {
      botNs.connect();
    }
  },
  {
    deep: true,
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
