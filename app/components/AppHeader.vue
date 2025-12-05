<script setup lang="ts">
const route = useRoute();
const isLogged = computed(() => route.name === "login" || route.name === "index");
</script>

<template>
  <div class="heading p-2">
    <Transition>
      <nav v-if="!isLogged" class="navbar navbar-expand-lg bg-body-tertiary rounded">
        <div class="container-fluid">
          <a
            class="d-flex align-items-center gap-2 text-decoration-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="offcanvas"
          >
            <img src="/img/crawjud.png" alt="" width="45" />
            <span class="fs-4 d-flex align-items-center text-white">Menu</span>
          </a>
        </div>
      </nav>
    </Transition>
  </div>
</template>
<style lang="css" scoped>
/* we will explain what these classes do next! */
/* Aplica transição suave de recolhimento vertical usando translateY */
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-60px) scaleY(0.2);
}

.v-enter-to,
.v-leave-from {
  transform: translateY(0) scaleY(1);
}

.p-menubar {
  background: var(--color-maroon-950);
}

.heading {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
}
</style>
