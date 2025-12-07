<script setup lang="ts">
const listagemRobos = useListagemRobos();
const listagem = computed<BotInfo[]>(() => listagemRobos.data);

onBeforeMount(async () => {
  await listagemRobos.listagem();
});

onUnmounted(() => {
  listagemRobos.data = [];
});
</script>

<template>
  <Container :main-class="'container-fluid'">
    <template #heading> Robos Page </template>
    <TransitionGroup tag="div" name="bots" class="row">
      <div class="col-lg-4 col-xl-4 p-3" v-for="(bot, index) in listagem" :key="index">
        <div class="card">
          <div class="card-header">
            {{ bot.display_name }}
          </div>
          <div class="card-body">teste!</div>
        </div>
      </div>
    </TransitionGroup>
  </Container>
</template>

<style lang="css" scoped>
.bots-enter-active,
.bots-leave-active {
  transition: all 0.5s;
}
.bots-enter-from,
.bots-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.card-body {
  height: 280px;
}

.card {
  background-color: var(--color-flirt-950);
}
</style>
