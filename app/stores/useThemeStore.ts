import { defineStore } from "pinia";

export default defineStore("themeStore", () => {
  const themes: Theme[] = ["dark", "light", "system"];

  const callableThemes: Record<Theme, () => Promise<void>> = {
    dark: window.themeApi.toggleDarkMode,
    light: window.themeApi.toggleLightMode,
    system: window.themeApi.toggleToSystem,
  };

  const rowTheme = ref(0);
  const current = computed(() => themes[rowTheme.value] as Theme);

  async function loadTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentPreset = await window.themeApi.currentPreset();

    const presetIndex = themes.indexOf(currentPreset as Theme);
    rowTheme.value = presetIndex !== -1 ? presetIndex : 1; // default to "light" if not found

    const theme = themes[rowTheme.value] as Theme;
    document.documentElement.setAttribute(
      "app-theme",
      theme === "system" ? (isDark ? "dark" : "light") : theme,
    );

    await callableThemes[theme]();
  }

  async function toggleTheme() {
    rowTheme.value = (rowTheme.value + 1) % themes.length;
    const selectedTheme = themes[rowTheme.value] as Theme;

    await callableThemes[selectedTheme]();
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.setAttribute(
      "app-theme",
      selectedTheme === "system" ? (isDark ? "dark" : "light") : selectedTheme,
    );
  }

  return { current, loadTheme, toggleTheme, themes, rowTheme };
});
