import { homedir } from "os";

const homeUser = homedir();

class DeepFunctions {
  static functions: DeepLinkFunctions = {
    download_execucao: {
      need_args: true,
      function: (pid: string) => {
        console.log(pid, homeUser);
      },
    },
  };
}

export default DeepFunctions;
