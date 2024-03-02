import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './domain/entities/user.entity';
import { DeleteUserService } from './application/services/delete/delete.service';
import { CreateUserService } from './application/services/create/create.service';
import { UpdateUserService } from './application/services/update/update.service';
import { GetUserService } from './application/services/get/get.service';
import { UserRepositortPostgres } from './infrastructure/persistence/user.postgres';
import { PasswordRepository } from './infrastructure/utils/password.repository';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    DeleteUserService,
    CreateUserService,
    UpdateUserService,
    GetUserService,
    UserRepositortPostgres,
    PasswordRepository,
  ],
})
export class UserModule {}
