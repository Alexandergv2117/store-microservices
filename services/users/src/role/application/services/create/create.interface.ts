import { CreateRoleDTO } from '../../dto/create.dto';

import { Role } from 'src/shared/domain/entities/roles';

export interface ICreateRoleService {
  create(rol: CreateRoleDTO): Promise<Role>;
}
