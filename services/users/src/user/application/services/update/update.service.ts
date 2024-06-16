import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IUpdateOneRoleService, IUpdateUserService } from './update.interface';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { getfield } from 'src/shared/infrastructure/utils/error';
import {
  ROLES_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import { uuidv7 } from 'uuidv7';
import { User } from 'src/shared/domain/entities/user';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}
  async updateOne({ id, user }: IUpdateOneRoleService): Promise<User> {
    const existUser = await this.userRepository.findById({ id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.image) {
      const imageName = `users/${uuidv7()}.${user.image.mimetype.split('/')[1]}`;

      const deleteImage = await this.imageRepository.deleteImage({
        name: existUser.image,
      });

      if (!deleteImage) {
        throw new HttpException('Error deleting image', HttpStatus.BAD_REQUEST);
      }

      const imageSaved = await this.imageRepository.uploadImage({
        image: user.image,
        name: imageName,
      });

      if (!imageSaved) {
        throw new HttpException('Error saving image', HttpStatus.BAD_REQUEST);
      }

      existUser.image = imageName;
    }

    existUser.username = user.username || existUser.username;
    existUser.name = user.name || existUser.name;
    existUser.lastname = user.lastname || existUser.lastname;
    existUser.email = user.email || existUser.email;
    existUser.phone = user.phone || existUser.phone;
    existUser.role = user.role
      ? await this.rolesRepository.findByName({ role: user.role })
      : existUser.role;

    try {
      const result = await this.userRepository.updateOne({
        id,
        user: existUser,
      });

      if (!result) {
        throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      }

      return result;
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
