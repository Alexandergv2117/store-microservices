import { Module } from '@nestjs/common';

import { DeleteUserService } from './application/services/delete/delete.service';
import { CreateUserService } from './application/services/create/create.service';
import { UpdateUserService } from './application/services/update/update.service';
import { GetUserService } from './application/services/get/get.service';
import { UserRepositortPostgres } from './infrastructure/persistence/user.postgres';
import { PasswordRepository } from './infrastructure/utils/password.repository';
import { UserController } from './infrastructure/controllers/user.controller';
import { ORM } from 'src/shared/infrastructure/config/orm';

@Module({
  imports: [ORM],
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
