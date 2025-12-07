import { defineStore } from "pinia";

type Theme = "light" | "dark" | "auto";

export default defineStore("themeStore", () => {
  const current = ref<Theme>("auto");
  const mediaTheme = computed(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  function setTheme() {
    if (current.value === "auto") {
      document.documentElement.setAttribute("app-theme", mediaTheme.value);
      return;
    }
    document.documentElement.setAttribute("app-theme", current.value);
  }
  return { mediaTheme, current, setTheme };
});
