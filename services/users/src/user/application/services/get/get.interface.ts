import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export interface IGetUserByIdService {
  id: string;
}

export interface IGetUserService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: UserEntity[]; total: number }>;
  getOneById(data: IGetUserByIdService): Promise<UserEntity>;
}
