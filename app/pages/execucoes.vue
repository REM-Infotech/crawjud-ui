<script setup lang="ts">
import type { BaseColorVariant } from "bootstrap-vue-next";

const execucaoStore = useExecutionStore();
const execToRef = storeToRefs(execucaoStore);
const { queryExecucao, execucoes, logsExecucao, execucao, itemLog } = execToRef;

const bodyListagem = ref<elementRef>(null as unknown as elementRef);
const hoveredExecId = ref();
const SetExec = ref(false);

onBeforeMount(async () => {
  await execucaoStore.listar_execucoes();
});

watch(itemLog, async (newValue) => {
  if (!newValue) return;

  await nextTick();

  const el = newValue as HTMLElement;
  // Encontra o container de rolagem mais próximo
  const scrollContainer = el.closest(".body-listagem");
  if (scrollContainer) {
    // Rola apenas o container, não a página inteira
    await new Promise((resolve) => setTimeout(resolve, 500));
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }
});

async function performSelecaoExec(e: Event, exec: Execucao) {
  e.preventDefault();

  if (SetExec.value) return;
  if (execucao.value === exec) return;
  SetExec.value = true;
  execucao.value = exec;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  SetExec.value = false;
}

const classLogs: Record<MessageType, string> = {
  log: "border border-2 border-info",
  success: "border border-2 border-success",
  error: "border border-2 border-danger",
  info: "border border-2 border-primary",
  warning: "border border-2 border-warning",
};

const VariantLogs: Record<MessageType, keyof BaseColorVariant> = {
  success: "success",
  error: "danger",
  info: "primary",
  log: "info",
  warning: "warning",
};
</script>

<template>
  <div class="execucoes-container">
    <BRow class="row-execucoes">
      <BCol class="col-execucoes" md="6" lg="6" sm="6" xl="6" xxl="6">
        <div class="card card-exec">
          <div class="card-header header-exec">
            {{ execucao.pid ? `Execução selecionada:  ${execucao.pid}` : "Execuções" }}
          </div>
          <BFormFloatingLabel
            class="mt-2 mb-2"
            label-size="md"
            label="Filtre aqui"
            for="inputFiltro"
          >
            <BFormInput id="inputFiltro" placeholder="Filtro de execução" v-model="queryExecucao" />
          </BFormFloatingLabel>
          <div class="body-listagem card-body">
            <TransitionGroup
              name="list"
              class="list-group"
              tag="div"
              :ref="
                (el) => {
                  bodyListagem = el;
                }
              "
            >
              <BListGroupItem
                class="d-flex justify-content-between align-items-start"
                v-for="exec in execucoes"
                :key="exec.id"
                :active="hoveredExecId === exec.id"
                @mouseenter="hoveredExecId = exec.id"
                @mouseleave="hoveredExecId = null"
                @click="async (e: Event) => performSelecaoExec(e, exec)"
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
        </div>
      </BCol>
      <BCol class="col-execucoes" md="6" lg="6" sm="6" xl="6" xxl="6">
        <div class="card card-exec">
          <div
            class="card-header header-exec d-flex justify-content-between align-items-center p-3"
          >
            <span class="fw-bold fs-5">
              {{ execucao.pid ? `Execução ${execucao.pid}` : "Selecione uma Execução" }}
            </span>

            <div style="height: 35px" class="d-flex gap-1">
              <BButton
                size="md"
                variant="primary"
                @click="execucaoStore.encerrar_execucao(execucao.pid)"
              >
                <span class="fw-bold"> Baixar Arquivos </span>
              </BButton>
              <BButton
                size="md"
                variant="danger"
                v-if="execucao && execucao.status === 'Em Execução'"
                @click="execucaoStore.encerrar_execucao(execucao.pid)"
              >
                <span class="fw-bold"> Encerrar Execução </span>
              </BButton>
            </div>
          </div>
          <div class="body-listagem card-body body-exec">
            <TransitionGroup name="list" class="list-group" tag="div">
              <div
                :ref="
                  (el) => {
                    itemLog = el;
                  }
                "
                :class="[
                  'd-flex',
                  'justify-content-between',
                  'align-items-start',
                  classLogs[log.message_type],
                ]"
                v-for="(log, idx) in logsExecucao"
                :key="idx"
                class="list-group-item"
              >
                <div class="ms-2 me-auto">
                  <div class="fw-bold" style="line-break: anywhere">{{ log.message }}</div>
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
              </div>
            </TransitionGroup>
          </div>
          <div class="card-footer footer-exec">
            {{ execucao.status ? `Status ${execucao.status}` : "" }}
          </div>
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
}

.col-execucoes {
  padding: 25px;
  height: calc(100dvh - 140px);
}

.card-exec {
  height: 100%;
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
  box-sizing: border-box;
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
