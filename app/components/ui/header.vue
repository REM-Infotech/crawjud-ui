<script setup lang="ts">
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 15.5px 15.5px;
}
.nav-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 15px;
  justify-content: center;
}
@media (prefers-color-scheme: dark) {
  .navbar {
    background-color: var(--p-maroon-950) !important;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  }
  .nav-items li {
    color: #ffffff;
  }
}

.navbar-anim-enter-active,
.navbar-anim-leave-active {
  transition: all 0.3s ease;
}

.navbar-anim-enter-from,
.navbar-anim-leave-to {
  transform: translateY(-45px);
}
</style>
