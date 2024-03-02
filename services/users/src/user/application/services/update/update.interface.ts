import { UpdateUserDTO } from '../../dto/update.dto';

export interface IUpdateOneRoleService {
  id: string;
  user: UpdateUserDTO;
}

export interface IUpdateUserService {
  updateOne(data: IUpdateOneRoleService): Promise<void>;
}
