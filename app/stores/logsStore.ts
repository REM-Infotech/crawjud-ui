import { LogManager } from "#imports";
import LogCache from "@/pages/logs/LogCache.json";
import type { Chart as ChartJs } from "chart.js";
import { defineStore } from "pinia";
export default defineStore("logsStore", () => {
  const pid = ref("");
  const Chart = ref<ChartJs>();
  const itemLog = ref<HTMLElement>(); // Ref para o ul
  const receivedLogs = ref<Message[]>(LogCache);

  const listLogs = computed(() => receivedLogs.value);
  const Contador = computed(() => LogManager.contagemLogs());
  const fimExecucao = computed(() => receivedLogs.value[-1]?.message === "Fim da Execução");

  function $reset() {
    pid.value = "";
    receivedLogs.value = [];
    Chart.value = undefined;
    itemLog.value = undefined;
  }

  return {
    listLogs,
    pid,
    Chart,
    itemLog,
    receivedLogs,
    Contador,
    fimExecucao,
    $reset,
  };
});
