import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { ICreateRoleService } from './create.interface';
import { CreateRoleDTO } from '../../dto/create.dto';

import { RolesEntity } from '../../../domain/entities/roles.entity';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { RolesRepositoryPostgres } from '../../../infrastructure/persistence/role.postgres';

@Injectable()
export class CreateService implements ICreateRoleService {
  constructor(
    @Inject(RolesRepositoryPostgres)
    private readonly rolesRepository: IRolesRepository,
  ) {}
  async create(rol: CreateRoleDTO): Promise<RolesEntity> {
    const role = new RolesEntity();

    role.id = rol.id || uuidv7();
    role.role = rol.role;

    try {
      await this.rolesRepository.create(role);
      return await this.rolesRepository.findById(role.id);
    } catch (error) {
      console.error(error);
      if (error.code === '23505') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Role already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error creating user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
