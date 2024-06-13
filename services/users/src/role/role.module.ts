import { Global, Module } from '@nestjs/common';

import { CreateService } from './application/services/create/create.service';
import { RoleController } from './infrastructure/controllers/role.controller';
import { GetRoleService } from './application/services/get/get.service';
import { UpdateRoleService } from './application/services/update/update.service';
import { DeleteService } from './application/services/delete/delete.service';
import { ORM } from 'src/shared/infrastructure/config/orm';
import { ROLES_REPOSITORY } from 'src/shared/infrastructure/config/repository';

@Global()
@Module({
  imports: [ORM],
  controllers: [RoleController],
  providers: [
    CreateService,
    GetRoleService,
    UpdateRoleService,
    DeleteService,
    ROLES_REPOSITORY,
  ],
  exports: [ROLES_REPOSITORY],
})
export class RoleModule {}
