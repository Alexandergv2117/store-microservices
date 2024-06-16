import { PaginationDTO } from '../../../../shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Role } from 'src/shared/domain/entities/roles';

export interface IGetRoleByIdService {
  id: string;
}

export interface IGetRoleService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: Role[]; total: number }>;
  getOneById(data: IGetRoleByIdService): Promise<Role>;
}
