import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
  DB_HOST,
  DB_LOGGING,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../env';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresqlConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: DB_LOGGING,
};
