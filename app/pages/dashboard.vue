<script setup lang="ts">
const execucoesStore = useExecutionStore();
const { queryExecucao, execucoes } = storeToRefs(execucoesStore);
const hoveredExecId = ref();
const execucao = ref<Execucao>();
onBeforeMount(execucoesStore.listar_execucoes);
</script>

<template>
  <Container class="bg-execucao">
    <template #heading>
      <span class="fw-bold p-3 mt-2"> Execuções </span>
    </template>
    <BRow>
      <BCol md="6" lg="6" sm="6" xl="6" xxl="6">
        <div class="card">
          <BInputGroup class="mb-3">
            <BFormInput v-model="queryExecucao" />
          </BInputGroup>
          <div class="card-body execucoes p-3" style="height: 100dvh">
            <TransitionGroup name="list" class="list-group overflow-y-auto" tag="div">
              <BListGroupItem
                class="text-decoration-none"
                v-for="exec in execucoes"
                :key="exec.id"
                :active="hoveredExecId === exec.id"
                @mouseenter="hoveredExecId = exec.id"
                @mouseleave="hoveredExecId = null"
                @click="execucao = exec"
                active-class="active"
              >
                <span>
                  {{ exec.pid }}
                </span>
                <span>
                  {{ exec.status }}
                </span>
              </BListGroupItem>
            </TransitionGroup>
          </div>
        </div>
      </BCol>
      <BCol md="6" lg="6" sm="6" xl="6" xxl="6">
        <div class="card">
          <div class="card-header">Execução {{ (execucao || {}).pid }}</div>
          <div class="card-body execucoes p-3" style="height: 100dvh"></div>
        </div>
      </BCol>
    </BRow>
  </Container>
</template>

<style lang="css">
.container {
  position: relative;
  max-width: 100dvw !important;
  width: 85%;

  max-height: calc(100dvh - 200px);
  background-color: rgba(0, 0, 0, 0) !important;
  box-sizing: border-box;
}
</style>

<style lang="css" scoped>
.bg-execucao {
  height: 10%;
  max-height: calc(100dvh - 200px);
}

.container-execucao {
  overflow: hidden;
}

.execucoes {
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  max-height: calc(100dvh - 250px);
  border: 2px rgba(245, 245, 245, 0.4) dashed;
}

.listagem-execucoes {
  overflow: auto;
}

.card-log {
  height: 100%;
}

.card-body-log,
.card-header-log {
  background-color: var(--bg-card-log) !important;
}

.card-body-log,
.card-header-log {
  background-color: rgba(246, 177, 235, 0.301);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.bots-enter-active,
.bots-leave-active {
  transition: all 0.5s;
}
.bots-enter-from,
.bots-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
