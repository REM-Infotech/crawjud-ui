<script setup lang="ts">
import { useHead } from "#app";
import { BOrchestrator } from "bootstrap-vue-next";
const { $colormode } = useNuxtApp();

onBeforeMount(async () => {
  await Notification.requestPermission();
  await $colormode.setup();
});

onMounted(async () => {
  if (window.electronAPI) {
    await window.electronAPI.setTitle("CrawJUD");
  }
});

useHead({
  title: "CrawJUD",
});
</script>
<template>
  <BToast />
  <BOrchestrator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
