import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Product } from '../../../shared/domain/entities/product.entity';

export interface ProductRepository {
  createProduct(data: {
    product: Product;
  }): Promise<Product | { message: string } | null>;
  findAllProducts(
    data: PaginationDTO & SearchDTO,
  ): Promise<[Product[], number]>;
  findProductById(data: { id: string }): Promise<Product>;
  updateProduct(data: { id: string; product: Product }): Promise<Product>;
  deleteProduct(data: { id: string }): Promise<boolean>;
}
