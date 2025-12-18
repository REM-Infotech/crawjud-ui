<script setup lang="ts">
import CredenciaisView from "~/views/configuration/CredenciaisView.vue";
import UsuariosView from "~/views/configuration/UsuariosView.vue";
const hoverOpcaoConfig: Ref<keyof ComponentsConfiguracaoPage | null> = ref("usuarios");
const currentConfig: Ref<keyof ComponentsConfiguracaoPage> = ref("usuarios");
const compomentConfig: ComponentsConfiguracaoPage = {
  usuarios: UsuariosView,
  credenciais: CredenciaisView,
};

const paginaSelecionada = computed(() => compomentConfig[currentConfig.value]);
</script>

<template>
  <BContainer>
    <div class="configuracao-frame">
      <div class="opcoes-configuracao">
        <div class="d-flex flex-column" style="height: 100%">
          <div id="brand" class="d-flex justify-content-center align-items-center">
            <span class="fw-bold fs-5">Opções</span>
          </div>
          <div id="config-opt">
            <ul class="list-group list-group-flush border-bottom scrollarea mb-2">
              <BListGroupItem
                :active="hoverOpcaoConfig === 'usuarios' || currentConfig === 'usuarios'"
                @click="currentConfig = 'usuarios'"
                @mouseenter="hoverOpcaoConfig = 'usuarios'"
                @mouseleave="hoverOpcaoConfig = null"
                class="d-flex justify-content-between align-items-start"
                active-class="active"
              >
                <span> Usuários </span>
              </BListGroupItem>
              <BListGroupItem
                :active="hoverOpcaoConfig === 'credenciais' || currentConfig === 'credenciais'"
                @click="currentConfig = 'credenciais'"
                @mouseenter="hoverOpcaoConfig = 'credenciais'"
                @mouseleave="hoverOpcaoConfig = null"
                class="d-flex justify-content-between align-items-start"
                active-class="active"
              >
                <span> Credenciais </span>
              </BListGroupItem>
            </ul>
          </div>
        </div>
      </div>
      <div class="configuracao-content">
        <Transition name="config-page" mode="out-in">
          <component :is="paginaSelecionada" />
        </Transition>
      </div>
    </div>
  </BContainer>
</template>

<style lang="css">
[app-theme="dark"] {
  --bg-brand-config: var(--color-flirt-900);
}

[app-theme="light"] {
  --bg-brand-config: var(--color-maroon-100);
}
</style>

<style lang="css" scoped>
.configuracao-frame {
  background-color: var(--bg-primary);
  height: 100dvh;
  border-radius: 10px;
  max-height: calc(100dvh - 200px);
  display: flex;
}

.opcoes-configuracao {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgba(255, 255, 255, 0.247);
  height: 100%;
  width: 100dvw;
  max-width: 240px;
  min-width: 240px;
}

.configuracao-content {
  padding: 35px;
  width: 100%;
  height: 100dvh;
  max-height: 100%;
}

#brand {
  border-top-left-radius: 10px;
  background-color: var(--bg-brand-config);
  color: white;
  height: 100%;
  max-height: 44px;
}

.config-page-enter-active,
.config-page-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.config-page-enter-from,
.config-page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
