<script setup lang="ts">
import MaterialSymbolsLightCloseRounded from "~icons/material-symbols-light/close-rounded?width=48px&height=48px";
import MaterialSymbolsLightMinimizeRounded from "~icons/material-symbols-light/minimize-rounded?width=48px&height=48px";
import MaterialSymbolsLightMoonStarsOutlineRounded from "~icons/material-symbols-light/moon-stars-outline-rounded?width=48px&height=48px";
import MaterialSymbolsLightNightSightAuto from "~icons/material-symbols-light/night-sight-auto?width=48px&height=48px";
import MaterialSymbolsLightOpenInFullRounded from "~icons/material-symbols-light/open-in-full-rounded?width=48px&height=48px";
import MaterialSymbolsLightSunnyOutline from "~icons/material-symbols-light/sunny-outline?width=48px&height=48px";

const { current } = storeToRefs(useThemeStore());
const { toggleTheme } = useThemeStore();

const routerName = ref(useRoute().name);
const currentRoute = computed(() => routerName.value);
const isLoginOrIndex = computed(() => {
  return currentRoute.value === "index" || currentRoute.value === "login";
});

const closeWindow = () => {
  window.windowApi.closeWindow();
};

const minimizeWindow = () => {
  window.windowApi.minimizeWindow();
};

const maximizeWindow = () => {
  window.windowApi.maximizeWindow();
};

watch(
  () => useRoute().name,
  (newName) => {
    routerName.value = newName as string;
  },
);

const iconTheme = () => {
  return {
    light: MaterialSymbolsLightSunnyOutline,
    dark: MaterialSymbolsLightMoonStarsOutlineRounded,
    system: MaterialSymbolsLightNightSightAuto,
  }[current.value];
};
</script>

<template>
  <div class="header">
    <Transition name="navbar-anim" mode="out-in">
      <div class="navbar" v-if="currentRoute !== 'index'">
        <Transition name="navbar-anim" mode="out-in">
          <ul class="nav-items" v-if="!isLoginOrIndex">
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
        </Transition>
        <div class="window-buttons">
          <button class="change-theme" @click="toggleTheme">
            <Transition name="icon" mode="out-in">
              <component :is="iconTheme()" class="icon-button" />
            </Transition>
          </button>
          <button class="minimize-window">
            <MaterialSymbolsLightMinimizeRounded @click="minimizeWindow" />
          </button>
          <button class="maximize-window">
            <MaterialSymbolsLightOpenInFullRounded @click="maximizeWindow" />
          </button>
          <button class="close-window" @click="closeWindow">
            <MaterialSymbolsLightCloseRounded />
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
  border-radius: 20.5px;
  app-region: drag;
  width: 100%;
}

[app-theme="dark"] .navbar {
  background-color: var(--color-flirt-900);
}

[app-theme="light"] .navbar {
  background-color: var(--color-flirt-100);
}

.nav-items {
  list-style: none;
  margin: 0;
  display: flex;
  gap: 15px;
  justify-content: center;
  app-region: no-drag;
  font-weight: bolder;
}

.navbar-anim-enter-active,
.navbar-anim-leave-active {
  transition: all 0.3s ease;
}

.navbar-anim-enter-from,
.navbar-anim-leave-to {
  opacity: 0;
}

.change-theme {
  background-color: transparent;
  border: none;
  margin-right: 30px;
}

.change-theme:hover {
  cursor: pointer;
  box-shadow: var(--bg-box-shadow);
}

.icon-button {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.window-buttons {
  margin-left: auto;
  justify-content: center;
  align-items: center;
  app-region: no-drag;
  padding: 2px;
  display: flex;
  gap: 10px;
  margin-right: 15px;
}

.minimize-window,
.maximize-window,
.close-window {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 32px;
  height: 32px;
  border: none;
}

.maximize-window:hover,
.minimize-window:hover,
.close-window:hover {
  background-color: var(--bg-secondary);
  cursor: pointer;
}

.icon-enter-active,
.icon-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.7) rotate(-20deg);
}
.icon-enter-to,
.icon-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
</style>
