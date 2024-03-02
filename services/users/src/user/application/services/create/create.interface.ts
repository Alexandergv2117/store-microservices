import { UserEntity } from 'src/user/domain/entities/user.entity';
import { CreateUserDto } from '../../dto/create.dto';

export interface ICreateUserService {
  create(user: CreateUserDto): Promise<UserEntity>;
}
