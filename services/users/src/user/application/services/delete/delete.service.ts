import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IDeleteOneUserService, IDeleteUserService } from './delete.interface';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import {
  UPLOAD_IMAGE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}

  async deleteOne({ id }: IDeleteOneUserService): Promise<void> {
    const existUser = await this.userRepository.findById({ id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deleteUser = await this.userRepository.delete({ id });

    if (!deleteUser) {
      throw new HttpException('User not deleted', HttpStatus.BAD_REQUEST);
    }

    const deleteImage = await this.imageRepository.deleteImage({
      name: existUser.image,
    });

    if (!deleteImage) {
      throw new HttpException('Image not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('User deleted', HttpStatus.OK);
  }
}
