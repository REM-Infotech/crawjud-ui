<script setup lang="ts">
import MingcuteCloseSquareLine from "~icons/mingcute/close-square-line?width=48px&height=48px";
const routerName = ref(useRoute().name);
const currentRoute = computed(() => routerName.value);
watch(
  () => useRoute().name,
  (newName) => {
    routerName.value = newName as string;
  },
);

const isLoginOrIndex = computed(() => {
  return currentRoute.value === "index" || currentRoute.value === "login";
});
</script>

<template>
  <div class="header">
    <Transition name="navbar-anim" mode="out-in">
      <div class="navbar" v-if="!isLoginOrIndex">
        <ul class="nav-items">
          <li class="nav-item">
            <NuxtLink :to="{ name: 'dashboard' }">
              <span> Dashboard </span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink :to="{ name: 'robot-listagem' }">
              <span> Robôs </span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink :to="{ name: 'index' }">
              <span> Configurações </span>
            </NuxtLink>
          </li>
        </ul>
        <div class="window-buttons">
          <button is="window-button" aria-label="Minimize"></button>
          <button aria-label="Maximize">#480a36#480a36</button>
          <button is="window-button" aria-label="Close">
            <MingcuteCloseSquareLine />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.header {
  height: 55px;
  width: 100%;
}

.navbar {
  padding: 25px;
  height: 100%;
  display: flex;
  padding: 2px;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 25.5px;
  app-region: drag;
  width: 100%;
}

.window-buttons {
  margin-left: auto;
  app-region: no-drag;
}

.nav-items {
  list-style: none;
  margin: 0;
  display: flex;
  gap: 15px;
  justify-content: center;
  app-region: no-drag;
}

.navbar-anim-enter-active,
.navbar-anim-leave-active {
  transition: all 0.3s ease;
}

.navbar-anim-enter-from,
.navbar-anim-leave-to {
  opacity: 0;
}
</style>
