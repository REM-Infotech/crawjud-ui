<script setup lang="ts">
import Branding from "@/assets/img/Branding.png";

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  useRouter().push("/login");
});
</script>

<template>
  <div class="branding">
    <img :src="Branding" alt="" style="width: 640px" />
  </div>
</template>

<style lang="css" scoped>
.branding {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
}
</style>
