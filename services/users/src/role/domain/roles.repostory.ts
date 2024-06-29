import { Role } from 'src/shared/domain/entities/roles';

export interface IRolesRepository {
  findAll(options: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[Role[], number]>;
  findById(data: { id: string }): Promise<Role>;
  findByName(data: { role: string }): Promise<Role>;
  create(data: { role: Role }): Promise<Role>;
  delete(data: { id: string }): Promise<boolean>;
  updateOne(data: { id: string; role: Role }): Promise<Role>;
}
