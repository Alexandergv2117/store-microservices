export interface IDeleteOneCateforyService {
  id: string;
}

export interface IDeleteCategoryService {
  deleteOne(data: IDeleteOneCateforyService): Promise<void>;
}
