<script setup lang="ts">
import MaterialSymbolsLightCloudUpload from "~icons/material-symbols-light/cloud-upload?width=48px&height=48px";
import MaterialSymbolsLightFilePresent from "~icons/material-symbols-light/file-present?width=64px&height=64px";
const model = defineModel<FileInput>({ default: undefined });

const files = ref<File[]>();
const isDragging = ref(false);

function removeFile(idx: number) {
  console.log(idx);
  console.log(model.value);
  if (Array.isArray(model.value)) {
    model.value.splice(idx, 1);
  }
}

async function loadFile() {
  const filesLoad = await window.electronAPI.fileDialog();

  if (filesLoad.length > 0) {
    console.log(filesLoad);
    model.value = [] as File[];
    for (const file of filesLoad) {
      const fl = new File([file.buffer as BlobPart], file.name, { type: file.type });
      model.value.push(fl);
    }
  }
}

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
      <Transition name="file" mode="out-in">
        <div v-if="model" class="dropdown-body-file">
          <div v-for="(file, index) in model" :key="index" @click="removeFile(Number(index))">
            <MaterialSymbolsLightFilePresent />
            <span class="file-text fw-bold">
              {{ file.name }}
            </span>
          </div>
        </div>
        <div v-else class="dropdown-body">
          <MaterialSymbolsLightCloudUpload />
          <span class="file-text fw-bold"> Arraste e solte os arquivos aqui </span>
        </div>
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
  min-height: 100px;
  border: 2px dashed #aaa;
  border-radius: 15px;
  padding: 32px;
  text-align: center;
  box-sizing: border-box;
}

.dropfile-area.file {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #aaa;
  border-radius: 15px;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.5s;
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

.dropdown-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dropdown-body-file {
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
