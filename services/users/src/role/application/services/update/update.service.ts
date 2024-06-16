import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUpdateOneRoleService, IUpdateRoleService } from './update.interface';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { getfield } from 'src/shared/infrastructure/utils/error';
import { ROLES_REPOSITORY } from 'src/shared/infrastructure/config/repository';

@Injectable()
export class UpdateRoleService implements IUpdateRoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async updateOne({ id, role }: IUpdateOneRoleService): Promise<void> {
    const existRole = await this.rolesRepository.findById({ id });

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const existName = await this.rolesRepository.findByName({
      role: role.role,
    });

    if (existName) {
      throw new HttpException('Role already exist', HttpStatus.CONFLICT);
    }

    existRole.role = role.role || existRole.role;

    try {
      const result = await this.rolesRepository.updateOne({
        id,
        role: existRole,
      });

      if (!result) {
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
