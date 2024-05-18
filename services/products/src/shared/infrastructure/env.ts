export type DbType = 'relacional' | 'nosql';

export const PORT = parseInt(process.env.PORT, 10) || 5300;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const DB_NAME = process.env.DB_NAME || '';
export const DB_LOGGING = process.env.DB_LOGGING === 'true';
// export const DB_TYPE: DbType = (process.env.DB_TYPE as DbType) || 'relacional';
export const DB_TYPE: DbType = 'relacional';
