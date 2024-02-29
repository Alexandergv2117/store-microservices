import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IDeleteOneRoleService, IDeleteRoleService } from './delete.interface';
import { RolesRepositoryPostgres } from 'src/role/infrastructure/persistence/role.postgres';
import { IRolesRepository } from 'src/role/domain/roles.repostory';

@Injectable()
export class DeleteService implements IDeleteRoleService {
  constructor(
    @Inject(RolesRepositoryPostgres)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async deleteOne({ id }: IDeleteOneRoleService): Promise<void> {
    const existRole = await this.rolesRepository.findById(id);

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.rolesRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Role not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Role deleted', HttpStatus.OK);
  }
}
