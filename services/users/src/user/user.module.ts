import { Module } from '@nestjs/common';

import { DeleteUserService } from './application/services/delete/delete.service';
import { CreateUserService } from './application/services/create/create.service';
import { UpdateUserService } from './application/services/update/update.service';
import { GetUserService } from './application/services/get/get.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { ORM } from 'src/shared/infrastructure/config/orm';
import {
  PASSWORD_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';

@Module({
  imports: [ORM],
  controllers: [UserController],
  providers: [
    DeleteUserService,
    CreateUserService,
    UpdateUserService,
    GetUserService,
    USER_REPOSITORY,
    PASSWORD_REPOSITORY,
    UPLOAD_IMAGE_REPOSITORY,
  ],
})
export class UserModule {}
