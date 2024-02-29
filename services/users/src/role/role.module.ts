import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateService } from './application/services/create/create.service';
import { RolesEntity } from './domain/entities/roles.entity';
import { RoleController } from './infrastructure/controllers/role.controller';
import { RolesRepositoryPostgres } from './infrastructure/persistence/role.postgres';
import { GetRoleService } from './application/services/get/get.service';
import { UpdateRoleService } from './application/services/update/update.service';
import { DeleteService } from './application/services/delete/delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  controllers: [RoleController],
  providers: [
    CreateService,
    RolesRepositoryPostgres,
    GetRoleService,
    UpdateRoleService,
    DeleteService,
  ],
})
export class RoleModule {}
