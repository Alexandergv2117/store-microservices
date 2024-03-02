import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { UserEntity } from './entities/user.entity';

export interface ICheckUserExist {
  username?: string;
  email?: string;
  phone?: number;
}

export interface IUserRepository {
  checkUserExist(data: ICheckUserExist): Promise<UserEntity>;
  findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<[UserEntity[], number]>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  create(user: UserEntity): Promise<InsertResult>;
  delete(id: string): Promise<DeleteResult>;
  updateOne(id: string, user: UserEntity): Promise<UpdateResult>;
}
