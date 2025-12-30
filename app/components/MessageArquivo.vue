<script setup lang="ts">
const { linkArquivo } = storeToRefs(useExecutionStore());

async function verArquivo(ev: PointerEvent) {
  ev.preventDefault();
  await window.electron.showFile(linkArquivo.value);
}
</script>

<template>
  <div>
    <p>
      <span>Arquivo {response.data.file_name} salvo com sucesso!</span>
    </p>
    <p>
      <a href="#" @click="verArquivo" class="link-opacity-100 link-offset-3 link-primary">
        Veja o arquivo Aqui
      </a>
    </p>
  </div>
</template>
