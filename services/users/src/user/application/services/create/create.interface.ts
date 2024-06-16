import { CreateUserDto } from '../../dto/create.dto';
import { User } from 'src/shared/domain/entities/user';

export interface ICreateUserService {
  create(user: CreateUserDto): Promise<User>;
}
