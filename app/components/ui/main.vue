<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.layout {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>
