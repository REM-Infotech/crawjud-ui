<script setup lang="ts"></script>

<template>
  <UiHeader />
  <div class="layout">
    <NuxtPage />
  </div>
</template>

<style lang="css" scoped>
.layout {
  margin-top: 35px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.page-enter-active,
.page-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
