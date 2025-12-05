<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

const LogsSocket = socketio.socket("/bot_logs");
const { fimExecucao, pid, listLogs, Contador } = storeToRefs(logsStore());

onMounted(LogManager.MountedComponent);
onUnmounted(LogManager.clearRefs);

LogsSocket.on("logbot", LogManager.processLog);
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex gap-3">
        <BButton variant="danger" @click="() => LogsSocket.emit('bot_stop', { pid: pid })">
          Parar Execução
        </BButton>
        <a
          v-if="fimExecucao"
          :class="fimExecucao ? 'btn btn-success' : 'btn btn-outline-success'"
          :href="`crawjud://download_execucao/${pid}`"
        >
          Salvar Execução
        </a>
      </div>
    </div>
    <div class="card-body">
      <BRow>
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <span class="fw-semibold"
                >Logs Execução: <strong>{{ pid }}</strong>
              </span>
            </div>
            <div
              class="card-body p-5 bg-black overflow-y-auto"
              style="height: 22.5em"
              ref="itemLog"
            >
              <TransitionGroup tag="ul" name="fade">
                <li
                  v-for="(item, index) in listLogs"
                  :key="index"
                  :id="String(index)"
                  :class="item.message_type.toLowerCase()"
                >
                  <span class="fw-bold">
                    {{ item.message }}
                  </span>
                </li>
              </TransitionGroup>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <span class="fw-semibold">
                Logs Execução: <strong>{{ pid }}</strong>
              </span>
            </div>
            <div
              class="card-body p-5 d-flex flex-column justify-content-center align-items-center"
              style="height: 22.5em"
            >
              <Doughnut
                ref="Chart"
                v-model="Contador"
                :options="{
                  responsive: true,
                }"
                :data="{
                  labels: ['PENDENTES', 'SUCESSOS', 'ERROS'],
                  datasets: [
                    {
                      data: Contador,
                      backgroundColor: ['#0096C7', '#42cf06', '#FF0000'],
                    },
                  ],
                }"
              >
              </Doughnut>
            </div>
          </div>
        </div>
      </BRow>
    </div>
    <div class="card-footer">
      <span> Total: {{ LogManager.total }}</span>
      <span> Sucessos: {{ LogManager.sucessos }}</span>
      <span> Erros: {{ LogManager.erros }}</span>
      <span> Restantes: {{ LogManager.restantes }}</span>
    </div>
  </div>
</template>
<style lang="css" scoped>
.error {
  color: #bd0707;
  font-weight: bold;
  font-size: 0.8rem;
}

.info {
  color: #f1b00b;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
  font-size: 0.8rem;
}

.warning {
  color: #af3f07;
  font-weight: bold;
  font-size: 0.8rem;
}

.success {
  color: #66e96d;
  font-weight: bold;
  text-decoration: underline wavy green 1px !important;
  font-family: "Times New Roman", Times, serif;
  font-size: 0.8rem;
}

.log {
  color: #e8cffd;
  font-weight: bold;
  font-size: 0.8rem;
}
</style>
