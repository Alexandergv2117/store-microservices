import { RolesEntity } from '../../../domain/entities/roles.entity';
import { PaginationDTO } from '../../../../shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

export interface IGetRoleByIdService {
  id: string;
}

export interface IGetRoleService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: RolesEntity[]; total: number }>;
  getOneById(data: IGetRoleByIdService): Promise<RolesEntity>;
}
