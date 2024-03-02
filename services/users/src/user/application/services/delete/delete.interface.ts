export interface IDeleteOneUserService {
  id: string;
}

export interface IDeleteUserService {
  deleteOne(data: IDeleteOneUserService): Promise<void>;
}
