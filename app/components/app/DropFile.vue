<script setup lang="ts">
const model = defineModel<FileInStorage[]>({ default: undefined });
const files = ref<FileInStorage[]>();
const isDragging = ref(false);

function removeFile(idx: number) {
  if (Array.isArray(model.value)) {
    model.value.splice(idx, 1);
  }
}

async function loadFile(e: Event) {
  e.preventDefault();
  const filesLoad = await window.windowApi.fileDialog();
  if (filesLoad.length > 0) {
    model.value = [] as FileInStorage[];
    for (const file of filesLoad) {
      model.value.push(file);
    }
  }
}
</script>

<template>
  <!-- <div class="droparea">
    <div
      :class="
        model ? 'dropfile-area file' : isDragging ? 'dropfile-area dragging' : 'dropfile-area'
      "
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @click="loadFile"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

    </div>
  </div> -->
  <div class="d-flex flex-column">
    <BButton variant="success" @click="loadFile"> Envie os arquivos aqui </BButton>
  </div>
  <Transition name="file" mode="out-in">
    <div class="list-items" v-if="model">
      <div v-for="(file, idx) in model" :key="idx">
        {{ file.name }}
      </div>
    </div>
  </Transition>
</template>

<style>
.droparea {
  padding: 15px;
}

.file-enter-active,
.file-leave-active {
  transition: opacity 0.3s;
}
.file-enter-from,
.file-leave-to {
  opacity: 0;
}
.file-enter-to,
.file-leave-from {
  opacity: 1;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
</style>
