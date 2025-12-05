import type { Placement } from "bootstrap-vue-next";

export default defineStore("sidebarStore", () => {
  const placement = ref<Placement>("start");
  const show = ref(false);

  return { placement, show };
});
