import { DeleteResult, InsertResult } from 'typeorm';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { ProductsEntity } from './entities/product.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';

export interface IProductsRepository {
  create(data: { product: ProductsEntity }): Promise<InsertResult>;
  findAll(data: PaginationDTO & SearchDTO): Promise<[ProductsEntity[], number]>;
  findById(data: { id: string }): Promise<ProductsEntity>;
  delete(data: { id: string }): Promise<DeleteResult>;
}
