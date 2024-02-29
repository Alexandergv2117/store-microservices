import { UpdateRoleDTO } from '../../dto/update.dto';

export interface IUpdateOneRoleService {
  id: string;
  role: UpdateRoleDTO;
}

export interface IUpdateRoleService {
  updateOne(data: IUpdateOneRoleService): Promise<void>;
}
