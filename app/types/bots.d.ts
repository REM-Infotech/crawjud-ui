/**
 * Representa os sistemas judiciais suportados.
 */
type SytemBots = "PROJUDI" | "ESAJ" | "ELAW" | "JUSDS" | "PJE";
/**
 * Define os tipos de formulários de configuração disponíveis.
 */
type ConfigForm =
  | "file_auth"
  | "multiple_files"
  | "only_auth"
  | "proc_parte"
  | "only_file"
  | "pje"
  | "pje_protocolo";
/**
 * Indica o status atual de execução do robô.
 */
type StatusBot = "Inicializando" | "Em Execução" | "Finalizado";
/**
 * Informações detalhadas sobre um robô disponível.
 *
 * @property {number} Id - Identificador único do robô.
 * @property {ConfigForm} configuracao_form - Tipo de formulário usado.
 * @property {string} display_name - Nome exibido na interface.
 * @property {SytemBots} sistema - Sistema judicial associado.
 * @property {string} descricao - Descrição do robô.
 * @property {string} categoria - Categoria do robô.
 */
interface BotInfo {
  Id: number;
  configuracao_form: ConfigForm;
  display_name: string;
  sistema: SytemBots;
  descricao: string;
  categoria: string;
}

/**
 * Estrutura de resposta contendo lista de robôs.
 *
 * @property {BotInfo[]} listagem - Lista de robôs disponíveis.
 */
interface BotPayload {
  listagem: BotInfo[];
}

/**
 * Representa uma opção de seleção de credencial.
 *
 * @property {number | null | undefined} value - Valor da credencial.
 * @property {string} text - Texto exibido para a opção.
 */
interface CredenciaisSelect {
  value: number | null | undefined;
  text: string;
}

/**
 * Estrutura de resposta contendo credenciais disponíveis.
 *
 * @property {CredenciaisSelect[]} credenciais - Lista de credenciais.
 */
interface CredenciaisPayload {
  credenciais: CredenciaisSelect[];
}

/**
 * Dados retornados ao iniciar um robô.
 *
 * @property {string} pid - Identificador do processo.
 * @property {string} title - Título da operação.
 * @property {string} message - Mensagem de status.
 * @property {MessageType} status - Tipo de mensagem.
 */
interface StartBotPayload {
  pid: string;
  title: string;
  message: string;
  status: MessageType;
}

/**
 * Estrutura de mensagem de status de execução do robô.
 *
 * @property {string} pid - Identificador do processo.
 * @property {string} message - Mensagem detalhada.
 * @property {MessageType} message_type - Tipo da mensagem.
 * @property {StatusBot} status - Status atual do robô.
 * @property {string} start_time - Horário de início.
 * @property {number} row - Linha atual do processamento.
 * @property {number} total - Total de itens a processar.
 * @property {number} erros - Quantidade de erros.
 * @property {number} sucessos - Quantidade de sucessos.
 * @property {number} restantes - Itens restantes.
 * @property {string} link - Link para detalhes ou download.
 */
interface Message {
  pid: string;
  message: string;
  message_type: MessageType;
  status: StatusBot;
  start_time: string;
  row: number;
  total: number;
  erros: number;
  sucessos: number;
  restantes: number;
  link: string;
}

/**
 * Tipos de contadores de execução do robô.
 */
type Contadores = "total" | "sucessos" | "erros" | "restantes";

/**
 * Interface para valores dos contadores de execução.
 *
 * @template T - Tipo do contador.
 * @extends {Record<Contadores, number>}
 */
interface ValoresContador extends Record<Contadores, number> {
  [key in T]: number;
}
