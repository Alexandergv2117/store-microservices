import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { RolesEntity } from './entities/roles.entity';

export interface IRolesRepository {
  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[RolesEntity[], number]>;
  findById(id: string): Promise<RolesEntity>;
  findByName(role: string): Promise<RolesEntity>;
  create(role: RolesEntity): Promise<InsertResult>;
  delete(id: string): Promise<DeleteResult>;
  updateOne(id: string, role: RolesEntity): Promise<UpdateResult>;
}
