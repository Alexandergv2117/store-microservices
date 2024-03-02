import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/user.repository';
import { UserRepositortPostgres } from 'src/user/infrastructure/persistence/user.postgres';
import { IGetUserByIdService, IGetUserService } from './get.interface';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { UserEntity } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(
    @Inject(UserRepositortPostgres)
    private readonly userRepository: IUserRepository,
  ) {}

  async getAll({ search, limit, page }: PaginationDTO & SearchDTO): Promise<{
    data: UserEntity[];
    total: number;
  }> {
    const [data, total] = await this.userRepository.findAll({
      search,
      limit,
      page,
    });

    if (total === 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
      total,
    };
  }

  async getOneById({ id }: IGetUserByIdService): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
