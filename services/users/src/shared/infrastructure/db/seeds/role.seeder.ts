import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ROLES_REPOSITORY } from '../../config/repository';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { Role } from 'src/shared/domain/entities/roles';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class RolesSeederService implements OnModuleInit {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async onModuleInit() {
    console.log('Seeding roles...');
    await this.createAdminRole();
    console.log('Seeding roles completed');
  }

  private async createAdminRole() {
    const newRol = 'admin';
    const role = await this.rolesRepository.findByName({ role: newRol });

    if (!role) {
      const role = new Role(uuidv7(), newRol);
      await this.rolesRepository.create({ role });
    }
  }
}
