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
    AWS_BUCKET_NAME_IMAGE: string;
    AWS_BUCKET_NAME_REGION: string;
    AWS_PUBLIC_KEY: string;
    AWS_SECRET_KEY: string;
  }
}
