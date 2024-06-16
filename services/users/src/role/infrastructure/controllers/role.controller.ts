import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { SearchDTO } from '../../../shared/application/dto/search.dto';
import { PaginationDTO } from '../../../shared/application/dto/pagination.dto';
import { CreateRoleDTO } from '../../application/dto/create.dto';
import { ICreateRoleService } from '../../application/services/create/create.interface';
import { CreateService } from '../../application/services/create/create.service';
import { IGetRoleService } from '../../application/services/get/get.interface';
import { GetRoleService } from '../../application/services/get/get.service';
import { GetIdRoleDTO } from 'src/role/application/dto/get.dto';
import { IUpdateRoleService } from 'src/role/application/services/update/update.interface';
import { UpdateRoleService } from 'src/role/application/services/update/update.service';
import { UpdateRoleDTO } from 'src/role/application/dto/update.dto';
import { IDeleteRoleService } from 'src/role/application/services/delete/delete.interface';
import { DeleteService } from 'src/role/application/services/delete/delete.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(
    @Inject(CreateService)
    private readonly createService: ICreateRoleService,
    @Inject(GetRoleService)
    private readonly getService: IGetRoleService,
    @Inject(UpdateRoleService)
    private readonly updateService: IUpdateRoleService,
    @Inject(DeleteService)
    private readonly deleteService: IDeleteRoleService,
  ) {}

  @Post('')
  async createRole(@Body() role: CreateRoleDTO) {
    return this.createService.create(role);
  }

  @Get('')
  async getRoles(
    @Query() pagination: PaginationDTO,
    @Query() search: SearchDTO,
  ) {
    const roles = await this.getService.getAll({ ...pagination, ...search });

    return {
      data: {
        roles: roles.data,
      },
      total: roles.total,
    };
  }

  @Get(':id')
  async getRoleById(@Param() { id }: GetIdRoleDTO) {
    return await this.getService.getOneById({ id });
  }

  @Put(':id')
  async updateRole(@Param() { id }: GetIdRoleDTO, @Body() role: UpdateRoleDTO) {
    return await this.updateService.updateOne({ id, role });
  }

  @Delete(':id')
  async deleteRole(@Param() { id }: GetIdRoleDTO) {
    return await this.deleteService.deleteOne({ id });
  }
}
