import DeepFunctions from "@/services/deepService";
import { mainWindow } from "./main";

class WindowUtils {
  static HandleFunction(cmdL: string[]): { fnName: DeepFunctionNames; args: string[] } {
    let args: string[] = [];
    const FunctionAndArgs = cmdL.pop()?.replace("crawjud://", "").split("/");

    const FuncAndArg = FunctionAndArgs as string[];
    const fnName = FuncAndArg[0] as DeepFunctionNames;

    if (FuncAndArg.length > 1) {
      args = FuncAndArg.slice(1);
    }
    console.log(args);
    return { fnName, args };
  }

  static async DeepLink(_: Electron.Event, cmdL: string[], __: string, ___: unknown) {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }

    const { fnName, args } = WindowUtils.HandleFunction(cmdL);
    const deepFunction = DeepFunctions.functions[fnName];

    if (deepFunction) {
      if (deepFunction.need_args) {
        return await deepFunction.function(...args);
      }
      return await deepFunction.function();
    }
  }
}

export default WindowUtils;
