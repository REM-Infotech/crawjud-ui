<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body overflow-y-auto" style="height: 25rem">
      <slot name="body" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
