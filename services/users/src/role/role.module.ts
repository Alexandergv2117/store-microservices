import { Global, Module } from '@nestjs/common';

import { CreateService } from './application/services/create/create.service';
import { RoleController } from './infrastructure/controllers/role.controller';
import { RolesRepositoryPostgres } from './infrastructure/persistence/role.postgres';
import { GetRoleService } from './application/services/get/get.service';
import { UpdateRoleService } from './application/services/update/update.service';
import { DeleteService } from './application/services/delete/delete.service';
import { ORM } from 'src/shared/infrastructure/config/orm';

@Global()
@Module({
  imports: [ORM],
  controllers: [RoleController],
  providers: [
    CreateService,
    RolesRepositoryPostgres,
    GetRoleService,
    UpdateRoleService,
    DeleteService,
  ],
  exports: [RolesRepositoryPostgres],
})
export class RoleModule {}
