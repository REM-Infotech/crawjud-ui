<script setup lang="ts">
import MaterialSymbolsLightMonitorHeartOutlineSharp from "~icons/material-symbols-light/monitor-heart-outline-sharp?width=48px&height=48px";

const modal = ref(false);
const { current } = storeToRefs(useBotForm());
const bots = useBotStore();
const queryBot = ref("");
const queryLower = computed(() => queryBot.value.toLowerCase());
const listagem = computed<BotInfo[]>(() =>
  bots.listagem.filter(
    (item) =>
      item.display_name.toLowerCase().includes(queryLower.value) ||
      item.sistema.toLowerCase().includes(queryLower.value),
  ),
);

onBeforeMount(async () => {
  await bots.listar_robos();
  const configs: Record<string, string> = {};
  for (const bot of bots.listagem) {
    configs[bot.configuracao_form] = "ok";
  }
});
watch(modal, async (val) => {
  if (!val) {
    await new Promise((r) => setTimeout(r, 200));
    current.value = {} as BotInfo;
  }
});
</script>

<template>
  <BContainer>
    <BotForm v-model="modal" :bot="current" />
    <BFormGroup>
      <BFormInput placeholder="Filtre aqui" v-model="queryBot" />
    </BFormGroup>

    <TransitionGroup tag="div" name="bots" class="row row-bots">
      <div class="col-lg-4 col-xl-4 p-2" v-for="(bot, index) in listagem" :key="index">
        <div class="card">
          <div class="card-header">
            <span class="text-white fw-bold fs-6">
              {{ bot.display_name }}
            </span>
          </div>
          <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
            <span class="text-white text-desc">
              {{ bot.descricao }}
            </span>
            <div class="d-flex gap-2 p-3">
              <div class="box-info">
                <div class="icon">
                  <MaterialSymbolsLightMonitorHeartOutlineSharp />
                </div>
                <span> Execuções</span>
                <span class="fw-bold"> 456</span>
              </div>
              <div class="box-info">testee</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              class="button-execute"
              @click="
                () => {
                  modal = true;
                  current = bot;
                }
              "
            >
              Executar
            </button>
            <button class="button-bot">Ver Logs</button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </BContainer>
</template>

<style lang="css">
.row-bots {
  height: calc(100dvh - 80px);
  overflow: auto;
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

.card {
  padding: 8px;
}

.text-desc {
  font-size: 1.2rem;
}

.card-header {
  border-bottom: 00.1px solid rgba(0, 0, 0, 0.233);
  font-weight: bold;
}

.card-header,
.card-footer {
  background-color: rgba(255, 255, 255, 0.226);
}

.card-footer {
  justify-content: space-around;
}

.button-execute {
  width: 7.2em;
  height: 2.5em;
  padding: 5px;
  font-weight: bold;
  background-color: rgba(35, 180, 6, 0.568);
}

.button-execute:hover {
  background-color: rgb(63, 94, 17);
}

.button-bot {
  width: 7.2em;
  height: 2.5em;
  padding: 5px;
  font-weight: bold;
}

.card-body {
  height: 280px;
}

.box-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 25px;
  margin-right: 25px;
  color: black;
  background-color: var(--color-flirt-100);
  width: 95px;
  height: 105px;
  padding: 5px;
}

.modal-app {
  min-width: 960px !important;
}
</style>
