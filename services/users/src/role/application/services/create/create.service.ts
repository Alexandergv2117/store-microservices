import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { ICreateRoleService } from './create.interface';
import { CreateRoleDTO } from '../../dto/create.dto';

import { IRolesRepository } from '../../../domain/roles.repostory';
import { getfield } from 'src/shared/infrastructure/utils/error';
import { ROLES_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { Role } from 'src/shared/domain/entities/roles';

@Injectable()
export class CreateService implements ICreateRoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}
  async create(rol: CreateRoleDTO): Promise<Role> {
    const existRole = await this.rolesRepository.findByName({ role: rol.role });

    if (existRole) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Role already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const role = new Role(rol.id || uuidv7(), rol.role);

    try {
      await this.rolesRepository.create({ role });
      return await this.rolesRepository.findById({ id: role.id });
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
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error creating role',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
