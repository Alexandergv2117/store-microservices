import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import { ICreateUserService } from './create.interface';
import { CreateUserDto } from '../../dto/create.dto';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { IPasswordRepository } from 'src/user/domain/password.repository';
import { getfield } from 'src/shared/infrastructure/utils/error';
import {
  PASSWORD_REPOSITORY,
  ROLES_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import { User } from 'src/shared/domain/entities/user';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @Inject(PASSWORD_REPOSITORY)
    private readonly passwordRepository: IPasswordRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const existRole = await this.rolesRepository.findByName({
      role: user.role,
    });

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    // Upload image
    const imageName = `users/${uuidv7()}.${user.image.mimetype.split('/')[1]}`;

    const imageSaved = await this.imageRepository.uploadImage({
      image: user.image,
      name: imageName,
    });

    if (!imageSaved) {
      throw new HttpException('Error saving image', HttpStatus.BAD_REQUEST);
    }

    try {
      const newUSer = await this.userRepository.create({
        user: {
          id: user.id || uuidv7(),
          username: user.username,
          password: this.passwordRepository.hashPassword(user.password),
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          image: imageName,
          role: existRole,
        },
      });
      return newUSer;
    } catch (error) {
      await this.imageRepository.deleteImage({ name: imageName });

      if (error.code === '23505') {
        const field = getfield(error.detail);
        throw new HttpException(`${field} already exists`, HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
}
