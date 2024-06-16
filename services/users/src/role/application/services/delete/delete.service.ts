import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IDeleteOneRoleService, IDeleteRoleService } from './delete.interface';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { ROLES_REPOSITORY } from 'src/shared/infrastructure/config/repository';

@Injectable()
export class DeleteService implements IDeleteRoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async deleteOne({ id }: IDeleteOneRoleService): Promise<void> {
    const existRole = await this.rolesRepository.findById({ id });

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.rolesRepository.delete({ id });

    if (!result) {
      throw new HttpException('Error deleting role', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Role deleted', HttpStatus.OK);
  }
}
