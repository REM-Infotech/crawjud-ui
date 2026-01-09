/* eslint-disable @typescript-eslint/no-unused-vars */
import { homedir } from "os";

const homeUser = homedir();

class DeepFunctions {
  static functions: DeepLinkFunctions = {
    download_execucao: {
      need_args: true,
      function: (pid: string) => {},
    },
  };
}

export default DeepFunctions;
