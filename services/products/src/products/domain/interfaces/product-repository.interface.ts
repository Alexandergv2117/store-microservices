import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { Product } from '../../../shared/domain/entities/product.entity';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

export interface ProductRepository {
  createProduct(data: {
    product: Product;
  }): Promise<Product | { message: string } | null>;
  findAllProducts(
    data: PaginationDTO & SearchDTO,
  ): Promise<[Product[], number]>;
  findProductById(data: { id: string }): Promise<Product>;
  // updateProduct(data: { product: Product }): Promise<Product>;
  deleteProduct(data: { id: string }): Promise<boolean>;
}
