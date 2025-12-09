// ... Tipos relacionados a download e funções deep link

/**
 * Nomes de funções deep link.
 */
type DeepFunctionNames = "download_execucao";

/**
 * Resposta do download de execução.
 */
interface ResponseDownloadExecucao {
  content: string;
  file_name: string;
}

/**
 * Interface para funções deep link.
 */
interface DeepLinkFunctions extends Record<DeepFunctionNames, unknown> {
  download_execucao: {
    need_args: boolean;
    function: (...args: unknown[]) => Promise<void> | void;
  };
}
