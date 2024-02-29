import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IGetRoleByIdService, IGetRoleService } from './get.interface';
import { RolesEntity } from '../../../domain/entities/roles.entity';
import { RolesRepositoryPostgres } from '../../../infrastructure/persistence/role.postgres';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

@Injectable()
export class GetRoleService implements IGetRoleService {
  constructor(
    @Inject(RolesRepositoryPostgres)
    private readonly rolesRepository: IRolesRepository,
  ) {}
  async getOneById({ id }: IGetRoleByIdService): Promise<RolesEntity> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: RolesEntity[]; total: number }> {
    const result = await this.rolesRepository.findAll({
      limit: query.limit,
      page: query.page,
      search: query.search,
    });

    return {
      data: result[0],
      total: result[1],
    };
  }
}
