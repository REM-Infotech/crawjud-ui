<script setup lang="ts">
const execucoesStore = useExecutionStore();
const { queryExecucao, execucoes, execucaoBot } = storeToRefs(execucoesStore);

const hoveredExecId = ref();
const execucao = ref<Execucao>();

onBeforeMount(execucoesStore.listar_execucoes);

const logNs = socketio.socket("/bot_logs");

watch(execucao, (newV) => {
  execucaoBot.value = newV?.pid as string;
});

watch(execucaoBot, () => {
  logNs.connect();
});

logNs.on("connect", () => {
  logNs.emit("join_room");
});
</script>

<template>
  <div class="execucoes-container">
    <BRow class="row-execucoes gap-3">
      <BCol class="col-execucoes card" md="5" lg="5" sm="5" xl="5" xxl="5">
        <div class="card-header">
          {{ execucao ? `Execução selecionada:  ${execucao.pid}` : "Execuções" }}
        </div>
        <BFormFloatingLabel class="mt-2 mb-2" label-size="md" label="Filtre aqui" for="inputFiltro">
          <BFormInput id="inputFiltro" placeholder="Filtro de execução" v-model="queryExecucao" />
        </BFormFloatingLabel>
        <div class="body-listagem card-body">
          <TransitionGroup name="list" class="list-group" tag="div">
            <BListGroupItem
              class="d-flex justify-content-between align-items-start"
              v-for="exec in execucoes"
              :key="exec.id"
              :active="hoveredExecId === exec.id"
              @mouseenter="hoveredExecId = exec.id"
              @mouseleave="hoveredExecId = null"
              @click="execucao = exec"
              active-class="active"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ exec.pid }}</div>
                {{ exec.status }}
              </div>
              <!-- <BBadge variant="primary" pill>14</BBadge> -->
            </BListGroupItem>
          </TransitionGroup>
        </div>
      </BCol>
      <BCol class="card col-execucoes" md="5" lg="5" sm="5" xl="5" xxl="5">
        <div class="card-header">
          {{ execucao ? `Execução ${execucao.pid}` : "Selecione uma Execução" }}
        </div>
        <div class="body-listagem card-body">
          <TransitionGroup name="list" class="list-group" tag="div">
            <BListGroupItem
              class="d-flex justify-content-between align-items-start"
              v-for="exec in execucoes"
              :key="exec.id"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ exec.pid }}</div>
                {{ exec.status }}
              </div>
              <!-- <BBadge variant="primary" pill>14</BBadge> -->
            </BListGroupItem>
          </TransitionGroup>
        </div>
        <div class="card-footer">
          {{ execucao ? `Status ${execucao.status}` : "" }}
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<style lang="css" scoped>
.execucoes-container {
  overflow: hidden;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  padding: 30px;
}

.col-execucoes {
  height: calc(100dvh - 240px);
}

.row-execucoes {
  width: 100%;
  justify-content: center;
}

.body-listagem {
  overflow: auto;
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
</style>
