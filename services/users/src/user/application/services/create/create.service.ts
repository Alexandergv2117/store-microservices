import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import { ICreateUserService } from './create.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { CreateUserDto } from '../../dto/create.dto';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IRolesRepository } from 'src/role/domain/roles.repostory';
import { IPasswordRepository } from 'src/user/domain/password.repository';
import { getfield } from 'src/shared/infrastructure/utils/error';
import {
  PASSWORD_REPOSITORY,
  ROLES_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @Inject(PASSWORD_REPOSITORY)
    private readonly passwordRepository: IPasswordRepository,
  ) {}
  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();

    newUser.id = user.id || uuidv7();
    newUser.username = user.username;
    newUser.password = this.passwordRepository.hashPassword(user.password);
    newUser.name = user.name;
    newUser.lastname = user.lastname;
    newUser.image = user.image;
    newUser.email = user.email;
    newUser.phone = user.phone;
    const existRole = await this.rolesRepository.findByName(user.role);

    if (!existRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    newUser.role = existRole;

    try {
      await this.userRepository.create(newUser);
      return await this.userRepository.findById(newUser.id);
    } catch (error) {
      if (error.code === '23505') {
        const field = getfield(error.detail);
        throw new HttpException(`${field} already exists`, HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
}
