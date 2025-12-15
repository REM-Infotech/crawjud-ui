/**
 * Representa os sistemas judiciais suportados.
 */

type FileInput = File[] | File | undefined;
type SystemBots = "PROJUDI" | "ESAJ" | "ELAW" | "JUSDS" | "PJE";
type Contadores = "total" | "sucessos" | "erros" | "restantes";
type CertificadoFile = (File & { name: `${string}.pfx` }) | null;
type KbdxFile = (File & { name: `${string}.kdbx` }) | null;
type StatusBot = "Inicializando" | "Em Execução" | "Finalizado";

interface BotInfo {
  Id: number;
  configuracao_form: ConfigForm;
  display_name: string;
  sistema: SystemBots;
  descricao: string;
  categoria: string;
}

interface BotPayload {
  listagem: BotInfo[];
}
interface CredenciaisSelect {
  value: number | null | undefined;
  text: string;
}
interface CredenciaisPayload {
  credenciais: CredenciaisSelect[];
}
interface StartBotPayload {
  pid: string;
  title: string;
  message: string;
  status: MessageType;
}

interface Message {
  pid: string;
  message: string;
  time_message: string;
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

interface ValoresContador extends Record<Contadores, number> {
  [key in T]: number;
}

type ConfigForm =
  | "file_auth"
  | "multiple_files"
  | "only_auth"
  | "only_file"
  | "pje"
  | "pje_protocolo"
  | "proc_parte";

type Execucao = {
  id: number;
  bot: string;
  pid: string;
  status: StatusBot;
  data_inicio: string;
  data_fim: string;
};
