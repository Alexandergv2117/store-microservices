import { User } from 'src/shared/domain/entities/user';

export interface ICheckUserExist {
  username?: string;
  email?: string;
  phone?: number;
}

export interface IUserRepository {
  checkUserExist(data: ICheckUserExist): Promise<User>;
  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[User[], number]>;
  findById(data: { id: string }): Promise<User>;
  findByEmail(data: { email: string }): Promise<User>;
  create(data: { user: User }): Promise<User>;
  delete(data: { id: string }): Promise<boolean>;
  updateOne(data: { id: string; user: User }): Promise<User>;
}
