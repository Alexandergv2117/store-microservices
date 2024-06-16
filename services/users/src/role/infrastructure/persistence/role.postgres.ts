import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { RolesEntity } from '../../domain/entities/roles.entity';
import { IRolesRepository } from '../../domain/roles.repostory';
import { Role } from 'src/shared/domain/entities/roles';

@Injectable()
export class RolesRepositoryPostgres implements IRolesRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}
  async updateOne({ id, role }: { id: string; role: Role }): Promise<Role> {
    try {
      const existRole = await this.roleRepository.findOne({ where: { id } });

      if (!existRole) {
        return null;
      }

      this.roleRepository.merge(existRole, role);

      const updateRole = await this.roleRepository.save(existRole);

      return updateRole;
    } catch (error) {
      return null;
    }
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[Role[], number]> {
    const { page = 1, limit = 10, search } = options;

    return this.roleRepository.findAndCount({
      where: {
        ...(search && {
          role: Like(`%${search}%`),
        }),
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findById({ id }: { id: string }): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  findByName({ role }: { role: string }): Promise<Role> {
    return this.roleRepository.findOne({ where: { role } });
  }

  create({ role }: { role: Role }): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async delete({ id }: { id: string }): Promise<boolean> {
    try {
      const isDelete = await this.roleRepository.delete(id);
      return isDelete.affected > 1;
    } catch (error) {
      return false;
    }
  }
}
