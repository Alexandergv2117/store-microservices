import { CreateRoleDTO } from '../../dto/create.dto';

import { RolesEntity } from '../../../domain/entities/roles.entity';

export interface ICreateRoleService {
  create(rol: CreateRoleDTO): Promise<RolesEntity>;
}
