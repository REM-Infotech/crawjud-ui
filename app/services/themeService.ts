import { ipcMain, type IpcMainInvokeEvent, nativeTheme } from "electron";

class ThemeService {
  static async toggleDarkMode(_: IpcMainInvokeEvent) {
    nativeTheme.themeSource = "dark";
  }

  static async toggleToSystem(_: IpcMainInvokeEvent) {
    nativeTheme.themeSource = "system";
  }

  static async toggleLightMode(_: IpcMainInvokeEvent) {
    nativeTheme.themeSource = "light";
  }
  static async currentPreset(_: IpcMainInvokeEvent) {
    return nativeTheme.themeSource;
  }
}

export default function useThemeService() {
  ipcMain.handle("dark-mode:toggle-dark", ThemeService.toggleDarkMode);
  ipcMain.handle("dark-mode:toggle-system", ThemeService.toggleToSystem);
  ipcMain.handle("dark-mode:toggle-light", ThemeService.toggleLightMode);
  ipcMain.handle("dark-mode:current-preset", ThemeService.currentPreset);
}
