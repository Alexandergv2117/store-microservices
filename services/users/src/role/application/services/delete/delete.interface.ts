export interface IDeleteOneRoleService {
  id: string;
}

export interface IDeleteRoleService {
  deleteOne(data: IDeleteOneRoleService): Promise<void>;
}
