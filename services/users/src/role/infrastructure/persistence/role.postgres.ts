import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InsertResult,
  DeleteResult,
  Repository,
  Like,
  UpdateResult,
} from 'typeorm';

import { RolesEntity } from '../../domain/entities/roles.entity';
import { IRolesRepository } from '../../domain/roles.repostory';

@Injectable()
export class RolesRepositoryPostgres implements IRolesRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}
  updateOne(id: string, role: RolesEntity): Promise<UpdateResult> {
    return this.roleRepository.update(id, role);
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[RolesEntity[], number]> {
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

  findById(id: string): Promise<RolesEntity> {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  findByName(role: string): Promise<RolesEntity> {
    return this.roleRepository.findOne({ where: { role } });
  }

  create(role: RolesEntity): Promise<InsertResult> {
    return this.roleRepository.insert(role);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
