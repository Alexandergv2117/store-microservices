import { User } from 'src/shared/domain/entities/user';
import { UpdateUserDTO } from '../../dto/update.dto';

export interface IUpdateOneRoleService {
  id: string;
  user: UpdateUserDTO;
}

export interface IUpdateUserService {
  updateOne(data: IUpdateOneRoleService): Promise<User>;
}
