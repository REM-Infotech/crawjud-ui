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
