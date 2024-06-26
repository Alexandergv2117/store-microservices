import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IGetRoleByIdService, IGetRoleService } from './get.interface';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { ROLES_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { Role } from 'src/shared/domain/entities/roles';

@Injectable()
export class GetRoleService implements IGetRoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}
  async getOneById({ id }: IGetRoleByIdService): Promise<Role> {
    const role = await this.rolesRepository.findById({ id });

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: Role[]; total: number }> {
    const [data, total] = await this.rolesRepository.findAll({
      limit: query.limit,
      page: query.page,
      search: query.search,
    });

    if (total === 0) {
      throw new HttpException('Roles not found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
      total,
    };
  }
}
