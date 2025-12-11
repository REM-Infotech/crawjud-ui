// ... Tipos de formulários

/**
 * Estrutura do formulário de login.
 */
interface FormLogin {
  login: string;
  password: string;
  remember: boolean;
}

interface formBot {
  configuracao_form: ConfigForm | null;
  xlsx: File | null;
  anexos: File[] | null;
  credencial: number | null | undefined;
  senha_token: string | null;
  certificado: CertificadoFile;
  kbdx: KbdxFile;
  sid_filesocket: string | null;
  bot_id: number | null;
}
