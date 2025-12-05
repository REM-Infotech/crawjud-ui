<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import AppCard from "~/components/AppCard.vue";

interface Columns {
  id: { type: "number" };
  bot: { type: "string" };
  pid: { type: "number" };
  status: { type: "string" };
  data_inicio: { type: "string" };
  data_fim: { type: "string" };
}

const columns: DtColumns<Columns>[] = [
  { data: "id", title: "#" },
  { data: "bot", title: "Nome Robô", type: "string" },
  { data: "pid", title: "PID" },
  { data: "status", title: "Status" },
  { data: "data_inicio", title: "Data Início" },
  { data: "data_fim", title: "Data Fim" },
];

function DtProps(props: unknown) {
  return props as ColumnProps<keyof Columns>;
}

const dt = ref();

// Função para buscar dados dos bots e repassar ao DataTable
async function get_bot(_: unknown, callback: Function, __: unknown) {
  // DataTables espera um objeto com a chave "data"
  const resp = await api.get("/bot/execucoes");
  return callback({ data: resp.data });
}

function handleLogs(props: ColumnProps<keyof Columns>) {
  const { $router } = useNuxtApp();
  $router.push({ path: `/logs/${props.rowData.pid}` });
}
</script>
<template>
  <div>
    <AppCard>
      <template #body>
        <DataTable ref="dt" :columns="columns" :ajax="get_bot">
          <template #column-2="props">
            <BButton v-if="DtProps(props).rowData.status == 'Finalizado'">
              <strong>{{ DtProps(props).cellData }}</strong>
            </BButton>
            <BButton
              v-else
              variant="outline-primary"
              @click="
                {
                  handleLogs(DtProps(props));
                }
              "
            >
              {{ DtProps(props).cellData }}
            </BButton>
          </template>
        </DataTable>
      </template>
    </AppCard>
  </div>
</template>
