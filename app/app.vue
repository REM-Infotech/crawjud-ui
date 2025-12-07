<script setup lang="ts">
import AppToast from "./components/AppToast.vue";

const theme = useThemeStore();

onBeforeMount(() => {
  theme.setTheme();
});
</script>

<template>
  <div class="window-box" />
  <BApp>
    <Loading />
    <AppToast />
    <NuxtLayout />
  </BApp>
</template>
