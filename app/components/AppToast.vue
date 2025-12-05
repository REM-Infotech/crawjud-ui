<script setup lang="ts">
const toast = useToasti();
</script>

<template>
  <Transition name="toast">
    <div class="toast" v-if="toast.active">
      <div class="toast-content">
        <span style="padding: 15px; color: black">
          {{ toast.title }}
        </span>
        <span>
          {{ toast.message }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--bg-primary);
  color: var(--color-primary);
  padding: 40px 45px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1; /* Initially hidden */
  z-index: 1000; /* Ensure it's on top */
}

.toast-info {
  background-color: color-mix(in srgb, var(--bg-primary) calc(0.4 * 100%), transparent);
}

.toast-error {
  background-color: color-mix(in srgb, var(--bg-error) calc(0.4 * 100%), transparent);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    transform 0.3s,
    opacity 0.3s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-20);
}
</style>
