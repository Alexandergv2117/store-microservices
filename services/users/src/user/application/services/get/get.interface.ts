import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { User } from 'src/shared/domain/entities/user';

export interface IGetUserByIdService {
  id: string;
}

export interface IGetUserService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: User[]; total: number }>;
  getOneById(data: IGetUserByIdService): Promise<User>;
}
