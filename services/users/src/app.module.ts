import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

import { postgresqlConfig } from './shared/infrastructure/config/postgreSQL.config';
import { DB_TYPE } from './shared/infrastructure/env';
import { RolesSeederService } from './shared/infrastructure/db/seeds/role.seeder';

const ORM =
  DB_TYPE === 'relacional' ? TypeOrmModule.forRoot(postgresqlConfig) : null;

@Module({
  imports: [ORM, RoleModule, UserModule],
  controllers: [AppController],
  providers: [AppService, RolesSeederService],
})
export class AppModule {}
