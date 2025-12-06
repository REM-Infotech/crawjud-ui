<script setup lang="ts"></script>

<template>
  <div class="content">
    <UiHeader />
    <div class="layout">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="css" scoped>
.layout {
  margin-bottom: 45px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 55px);
  width: 100%;
  overflow-y: auto;
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
