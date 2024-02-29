import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUpdateOneRoleService, IUpdateRoleService } from './update.interface';
import { RolesRepositoryPostgres } from '../../../infrastructure/persistence/role.postgres';
import { IRolesRepository } from '../../../domain/roles.repostory';
import { RolesEntity } from '../../../domain/entities/roles.entity';

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

    const result = await this.rolesRepository.updateOne(id, newRole);

    if (result.affected === 0) {
      throw new HttpException('Role not updated', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Role updated', HttpStatus.OK);
  }
}
