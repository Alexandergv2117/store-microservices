declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_LOGGING: 'true' | 'false';
  }
}
