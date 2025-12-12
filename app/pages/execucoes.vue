<script setup lang="ts">
import type { BaseColorVariant } from "bootstrap-vue-next";

const execucaoStore = useExecutionStore();
const execToRef = storeToRefs(execucaoStore);
const { queryExecucao, execucoes, logsExecucao, execucao, itemLog } = execToRef;

const _itemLog = itemLog;
const hoveredExecId = ref();

onBeforeMount(async () => {
  await execucaoStore.listar_execucoes();
});

const classLogs: Record<MessageType, string> = {
  success: "border border-2 border-success",
  error: "border border-2 border-danger",
  info: "border border-2 border-primary",
  warning: "border border-2 border-warning",
};

const VariantLogs: Record<MessageType, keyof BaseColorVariant> = {
  success: "success",
  error: "danger",
  info: "primary",
  warning: "warning",
};
</script>

<template>
  <div class="execucoes-container">
    <BRow class="row-execucoes gap-3">
      <BCol class="col-execucoes card" md="5" lg="5" sm="5" xl="5" xxl="5">
        <div class="card-header header-exec">
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
        <div class="card-header header-exec d-flex justify-content-between align-items-center">
          <span class="fw-bold">
            {{ execucao ? `Execução ${execucao.pid}` : "Selecione uma Execução" }}
          </span>
          <div style="height: 35px">
            <BButton size="md" variant="outline-danger" v-if="execucao">
              <span class="fw-bold"> Encerrar Execução </span>
            </BButton>
          </div>
        </div>
        <div class="body-listagem card-body body-exec">
          <TransitionGroup name="list" class="list-group" tag="div">
            <BListGroupItem
              ref="itemLog"
              :class="[
                'd-flex',
                'justify-content-between',
                'align-items-start',
                classLogs[log.message_type],
              ]"
              v-for="(log, idx) in logsExecucao"
              :key="idx"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ log.message }}</div>
                <div class="d-flex gap-1">
                  <BBadge :variant="VariantLogs[log.message_type]">
                    {{ log.message_type }}
                  </BBadge>
                  <BBadge variant="primary">
                    {{ log.time_message }}
                  </BBadge>
                  <div style="width: 50px">
                    <BBadge variant="secondary" v-if="log.row > 0">
                      linha planilha: {{ log.row }}
                    </BBadge>
                  </div>
                </div>
              </div>
            </BListGroupItem>
          </TransitionGroup>
        </div>
        <div class="card-footer footer-exec">
          {{ execucao ? `Status ${execucao.status}` : "" }}
        </div>
      </BCol>
    </BRow>
  </div>
</template>
<style lang="css">
[app-theme="dark"] {
  --bg-header-footer-exec: var(--color-flirt-800);
  --bg-body-exec: var(--color-flirt-900);
}

[app-theme="light"] {
  --bg-header-footer-exec: var(--color-flirt-200);
  --bg-body-exec: var(--color-flirt-300);
}
</style>
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

.header-exec {
  background-color: var(--bg-header-footer-exec);
}

.body-exec {
  background-color: var(--bg-body-exec) !important;
}

.footer-exec {
  background-color: var(--bg-header-footer-exec) !important;
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
