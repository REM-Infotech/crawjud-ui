<script setup lang="ts">
const model = defineModel<FileInStorage[]>();
const files = ref<FileInStorage[]>([]);

const filesInput = ref<File[]>([]);

function onChange() {
  if (model.value) {
    model.value = [...files.value];
  }
}

async function loadFile(e: Event) {
  e.preventDefault();
  const filesLoad = await window.windowApi.fileDialog();
  if (filesLoad.length > 0) {
    files.value = filesLoad;

    const filesSet: File[] = [];
    for (const file of filesLoad) {
      filesSet.push(new File([""], file.name, { type: file.type || "" }));
    }

    filesInput.value = filesSet;
  }
  onChange();
}
</script>

<template>
  <div class="d-flex flex-column">
    <BFormFile @click="loadFile" multiple size="md" v-model="filesInput" />
  </div>
</template>

<style>
.droparea {
  padding: 15px;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
</style>
