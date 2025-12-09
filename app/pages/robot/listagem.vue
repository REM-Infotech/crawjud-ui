<script setup lang="ts">
import FileAuth from "~/components/bot/FileAuth.vue";
import MultipleFiles from "~/components/bot/MultipleFiles.vue";
import OnlyAuth from "~/components/bot/OnlyAuth.vue";
import OnlyFile from "~/components/bot/OnlyFile.vue";
import PJeFileAuth from "~/components/bot/PJeFileAuth.vue";
import PJeProtocolo from "~/components/bot/PJeProtocolo.vue";
import MaterialSymbolsLightMonitorHeartOutlineSharp from "~icons/material-symbols-light/monitor-heart-outline-sharp?width=48px&height=48px";

const listagemRobos = useListagemRobos();
const listagem = computed<BotInfo[]>(() => listagemRobos.data);

onBeforeMount(async () => {
  await listagemRobos.listagem();
});

onUnmounted(() => {
  listagemRobos.data = [];
});

const modal = ref(false);

watch(
  () => modal,
  async (newValue) => {
    if (!newValue) {
      await new Promise((resolve) => setTimeout(resolve, 200));

      selectedBot.value = undefined;
    }
  },
);

const selectedBot = ref<BotInfo>();

function setSelectedBot(bot: BotInfo) {
  modal.value = true;
  selectedBot.value = bot;
}

const EmptyComponent = {
  template: "<div></div>",
};

const FormsBot: Record<ConfigForm, Component> = {
  file_auth: FileAuth,
  multiple_files: MultipleFiles,
  only_auth: OnlyAuth,
  proc_parte: EmptyComponent,
  only_file: OnlyFile,
  pje: PJeFileAuth,
  pje_protocolo: PJeProtocolo,
};

function getBotForm(bot: BotInfo) {
  return FormsBot[bot.configuracao_form];
}
</script>

<template>
  <Container :main-class="'container-fluid'">
    <AppModal v-model="modal">
      <template #header>
        <span class="fs-4 fw-bold">
          {{ selectedBot?.display_name }}
        </span>
      </template>
      <template #body>
        <component :is="getBotForm(selectedBot as BotInfo)" v-bind:bot="selectedBot" />
      </template>
    </AppModal>
    <div
      class="modal fade"
      id="modalBot"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    ></div>
    <template #heading> Robos Page </template>
    <TransitionGroup tag="div" name="bots" class="row">
      <div class="col-lg-3 col-xl-3 p-2" v-for="(bot, index) in listagem" :key="index">
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
            <button class="button-execute" @click="setSelectedBot(bot)">Executar</button>
            <button class="button-bot">Ver Logs</button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </Container>
</template>

<style lang="css">
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
