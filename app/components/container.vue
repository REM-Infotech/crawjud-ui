<script setup lang="ts">
const props = defineProps({
  mainClass: {
    type: String,
    default: "",
  },
  headingClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="[mainClass, 'container']">
    <div :class="[headingClass, 'heading']">
      <slot name="heading" />
    </div>
    <slot />
  </div>
</template>

<style lang="css" scoped>
.container {
  max-width: 960px; /* Limits the container width */
  margin: 0 auto; /* Centers the container horizontally */
  padding: 20px; /* Adds space around the content inside the box */
  background-color: var(--background-color-container);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border-radius: 5px; /* Rounded corners */
}

.container-fluid-app {
  min-width: calc(100% - 75px) !important; /* Full width */
}

.heading {
  margin-bottom: 15px;
  font-weight: lighter;
  font-size: 1.5em;
  color: var(--color-primary) !important;
}
</style>
