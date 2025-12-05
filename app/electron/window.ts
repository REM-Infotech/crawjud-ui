import DeepFunctions from "./deep";
import { mainWindow } from "./main";

class WindowUtils {
  static HandleFunction(commandLine: string[]): {
    funcName: DeepFunctionNames;
    args: string[];
  } {
    let args: string[] = [];
    const FunctionAndArgs = commandLine.pop()?.replace("crawjud://", "").split("/");

    const FuncAndArg = FunctionAndArgs as string[];
    const funcName = FuncAndArg[0] as DeepFunctionNames;

    if (FuncAndArg.length > 1) {
      args = FuncAndArg.slice(1);
    }

    return { funcName, args };
  }

  static async DeepLink(
    _event: Electron.Event,
    commandLine: string[],
    _workingDirectory: string,
    _additionalData: unknown,
  ) {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    // the commandLine is array of strings in which last element is deep link url

    const { funcName, args } = WindowUtils.HandleFunction(commandLine);

    const deepFunction = DeepFunctions.functions[funcName];
    if (deepFunction) {
      if (deepFunction.need_args) {
        return await deepFunction.function(...args);
      }
      return await deepFunction.function();
    }
  }
}

export default WindowUtils;
