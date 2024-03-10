import { DeleteResult } from 'typeorm';
import { ProductsEntity } from './entities/product.entity';
import { ProductsCategoriesEntity } from './entities/products_categories.entity';

export interface IProductCategoryRepository {
  create(data: {
    category: string;
    product: ProductsEntity;
  }): Promise<ProductsCategoriesEntity>;
  delete(id: number[]): Promise<DeleteResult>;
}
