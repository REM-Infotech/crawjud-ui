// ... Tipos para variáveis de ambiente

/**
 * Variáveis de ambiente do projeto.
 */
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_BETA_TEST: string;
  MINIO_ENDPOINT: string;
  MINIO_PORT: string;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
  MINIO_BUCKET_NAME: string;
}

/**
 * Interface para import.meta.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
