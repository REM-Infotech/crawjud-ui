<script setup lang="ts">
type FileInput = File | File[] | undefined;
const model = defineModel<FileInput>({ default: undefined });

const files = ref<File[]>();

const isDragging = ref(false);

function onChange() {
  if (Array.isArray(model.value)) {
    model.value.push(...(files.value ?? []));
  } else if (files.value && files.value.length === 1) {
    model.value = files.value[0];
  } else if (files.value && files.value.length > 1) {
    model.value = files.value;
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault();
  isDragging.value = false;
  files.value = e.dataTransfer?.files as unknown as File[];
  onChange();
}

function onDragLeave() {
  isDragging.value = false;
}

function onDragOver(e: DragEvent) {
  isDragging.value = true;
  e.preventDefault();
}
</script>

<template>
  <div class="droparea">
    <div
      :class="isDragging ? 'dropfile-area dragging' : 'dropfile-area'"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
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
      <Transition name="file" mode="out-in">
        <div v-if="model" class="file-text fw-bold">
          {{ model ? (Array.isArray(model) ? (model[0]?.name ?? "") : (model?.name ?? "")) : "" }}
        </div>
        <div v-else-if="isDragging" class="file-text fw-bold">Solte os arquivos aqui</div>
        <div v-else-if="!isDragging" class="file-text fw-bold">Arraste arquivos aqui</div>
      </Transition>
    </div>
  </div>
</template>

<style>
.droparea {
  padding: 15px;
}

.dropfile-area {
  width: 100%;
  height: 100px;
  border: 2px dashed #aaa;
  border-radius: 15px;
  padding: 32px;
  text-align: center;
  box-sizing: border-box;
}

.dropfile-area.dragging {
  border: 2px solid #aaa;
  background-color: rgba(0, 0, 0, 0.199);
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
