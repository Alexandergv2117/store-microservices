import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUpdateOneRoleService, IUpdateRoleService } from './update.interface';
import { RolesRepositoryPostgres } from '../../../infrastructure/persistence/role.postgres';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { RolesEntity } from '../../../domain/entities/roles.entity';
import { getfield } from 'src/shared/infrastructure/utils/error';

@Injectable()
export class UpdateRoleService implements IUpdateRoleService {
  constructor(
    @Inject(RolesRepositoryPostgres)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async updateOne({ id, role }: IUpdateOneRoleService): Promise<void> {
    const existRole = await this.rolesRepository.findById(id);

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const existName = await this.rolesRepository.findByName(role.role);

    if (existName) {
      throw new HttpException('Role already exist', HttpStatus.CONFLICT);
    }

    const newRole = new RolesEntity();
    newRole.role = role.role;

    try {
      const result = await this.rolesRepository.updateOne(id, newRole);

      if (result.affected === 0) {
        throw new HttpException('Role not updated', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Role updated', HttpStatus.OK);
    } catch (error) {
      if (error.code === '23505') {
        const field = getfield(error.detail);
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `${field} already exists`,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('Error updating role', HttpStatus.BAD_REQUEST);
    }
  }
}
