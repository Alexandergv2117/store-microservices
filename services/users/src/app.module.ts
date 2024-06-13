import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

import { postgresqlConfig } from './shared/infrastructure/config/postgreSQL.config';
import { DB_TYPE } from './shared/infrastructure/env';

const ORM =
  DB_TYPE === 'relacional' ? TypeOrmModule.forRoot(postgresqlConfig) : null;

@Module({
  imports: [ORM, UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
