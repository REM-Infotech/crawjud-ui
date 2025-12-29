<script setup>
import { ref } from "vue";

const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const position = ref({ x: 100, y: 100 });

function onMouseDown(e) {
  isDragging.value = true;
  dragOffset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
  if (!isDragging.value) return;
  position.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y,
  };
}

function onMouseUp() {
  isDragging.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}
</script>

<template>
  <div
    class="window"
    :style="{
      top: position.y + 'px',
      left: position.x + 'px',
      position: 'absolute',
      zIndex: 1000,
    }"
  >
    <div class="window-header" @mousedown="onMouseDown">
      <slot name="header">Janela</slot>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 300px;
  background: var(--bg-primary);
  border: 1px solid #000000;
  border-radius: 8px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  user-select: none;
}
.window-header {
  padding: 0.5rem;
  border-top: 15px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  background: var(--bg-secondary);
  cursor: grab;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
.window-body {
  padding: 1rem;
}
</style>
