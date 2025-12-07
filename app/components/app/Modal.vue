<script setup lang="ts">
import MaterialSymbolsLightCloseSmallOutlineRounded from "~icons/material-symbols-light/close-small-outline-rounded?width=32px&height=24px";
const model = defineModel({ type: Boolean, default: false });
const props = defineProps({
  showClose: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <Transition name="modal">
    <div class="overlay-modal" v-if="model" @click.self="model = false">
      <div class="modal-app">
        <div class="modal-app-header">
          <div>
            <slot name="header" />
          </div>
          <button class="btn-modal-close ms-auto me-3" v-if="showClose" @click="model = false">
            <MaterialSymbolsLightCloseSmallOutlineRounded />
          </button>
        </div>
        <div class="modal-app-body">
          <slot name="body" />
        </div>
        <div class="modal-app-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.overlay-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  z-index: 9999;
}

.modal-app {
  width: 640px;
  background-color: whitesmoke;
  border-radius: 15px;
  z-index: 9999;
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
}
.modal-app-header {
  display: flex;
  color: black;
  padding: 15px;
  height: 100%;
  background-color: rgba(136, 136, 136, 0.308);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.32);
}

.modal-app-footer {
  color: black;
  padding: 15px;
  background-color: rgba(136, 136, 136, 0.308);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  height: 100%;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.32);
}

.modal-app-body {
  color: rgb(0, 0, 0);
  width: 100%;

  padding: 15px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.btn-modal-close {
  border-radius: 15px;
  color: black;
  border: none;
  background-color: rgba(255, 255, 255, 0.11);
}

.btn-modal-close:hover {
  background-color: rgba(31, 26, 26, 0.31);
}
</style>
