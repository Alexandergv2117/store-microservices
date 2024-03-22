export interface IDeleteOneProductService {
  id: string;
}

export interface IDeleteProductService {
  deleteOne(data: IDeleteOneProductService): Promise<void>;
}
