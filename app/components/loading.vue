<template>
  <Transition name="load">
    <div v-if="load.active" class="overlay">
      <div class="spinner"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const load = useLoad();
</script>

<style>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.load-enter-active,
.load-leave-active {
  transition: opacity 0.3s;
}
.load-enter-from,
.load-leave-to {
  opacity: 0;
}
</style>
