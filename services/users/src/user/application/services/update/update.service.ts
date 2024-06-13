import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IUpdateOneRoleService, IUpdateUserService } from './update.interface';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { getfield } from 'src/shared/infrastructure/utils/error';
import {
  ROLES_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}
  async updateOne({ id, user }: IUpdateOneRoleService): Promise<void> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = new UserEntity();

    updateUser.username = user.username || existUser.username;
    updateUser.name = user.name || existUser.name;
    updateUser.lastname = user.lastname || existUser.lastname;
    updateUser.image = user.image || existUser.image;
    updateUser.email = user.email || existUser.email;
    updateUser.phone = user.phone || existUser.phone;
    updateUser.role = user.role
      ? await this.rolesRepository.findByName(user.role)
      : existUser.role;

    try {
      const result = await this.userRepository.updateOne(id, updateUser);

      if (result.affected === 0) {
        throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('User updated', HttpStatus.OK);
    } catch (error) {
      if (error.code === '23505') {
        const field = getfield(error.detail);
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `${field} already exists`,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }
}
