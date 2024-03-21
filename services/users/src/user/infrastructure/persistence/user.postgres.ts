import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import {
  ICheckUserExist,
  IUserRepository,
} from 'src/user/domain/user.repository';
import {
  InsertResult,
  DeleteResult,
  UpdateResult,
  Repository,
  Like,
} from 'typeorm';

@Injectable()
export class UserRepositortPostgres implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  checkUserExist({
    email = '',
    phone = 0,
    username = '',
  }: ICheckUserExist): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: [{ email }, { phone }, { username }],
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[UserEntity[], number]> {
    const { limit = 10, page = 1, search } = options;

    return this.userRepository.findAndCount({
      where: {
        ...(search && {
          name: Like(`%${search}%`),
          email: Like(`%${search}%`),
          lastname: Like(`%${search}%`),
          username: Like(`%${search}%`),
        }),
      },
      skip: (page - 1) * limit,
      take: limit,
      // withDeleted: true,
    });
  }

  findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  create(user: UserEntity): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  updateOne(id: string, user: UserEntity): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }
}
