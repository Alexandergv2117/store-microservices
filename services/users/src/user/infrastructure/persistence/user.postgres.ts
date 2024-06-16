import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from 'src/role/domain/entities/roles.entity';
import { User } from 'src/shared/domain/entities/user';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import {
  ICheckUserExist,
  IUserRepository,
} from 'src/user/domain/user.repository';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UserRepositortPostgres implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}
  checkUserExist({
    email = '',
    phone = 0,
    username = '',
  }: ICheckUserExist): Promise<User> {
    return this.userRepository.findOne({
      where: [{ email }, { phone }, { username }],
    });
  }

  findByEmail({ email }: { email: string }): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[User[], number]> {
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
      relations: ['role'],
      skip: (page - 1) * limit,
      take: limit,
      // withDeleted: true,
    });
  }

  findById({ id }: { id: string }): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async create({ user }: { user: User }): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { role: user.role.role },
    });

    if (!role) {
      return null;
    }

    return this.userRepository.save({
      ...user,
      role,
    });
  }

  async delete({ id }: { id: string }): Promise<boolean> {
    try {
      const isDelete = await this.userRepository.delete(id);
      return isDelete.affected > 0;
    } catch (error) {
      return false;
    }
  }

  async updateOne({ id, user }: { id: string; user: User }): Promise<User> {
    try {
      const role = await this.roleRepository.findOne({
        where: { role: user.role.role },
      });

      if (!role) {
        return null;
      }

      const updateUser = await this.userRepository.save({ ...user, id });
      return updateUser;
    } catch (error) {
      return null;
    }
  }
}
