import { Product } from '../../../shared/domain/entities/product.entity';

export interface ProductRepository {
  createProduct(data: { product: Product }): Promise<Product>;
  findAllProducts(): Promise<Product[]>;
  findProductById(data: { id: string }): Promise<Product>;
  updateProduct(data: { product: Product }): Promise<Product>;
  deleteProduct(data: { id: string }): Promise<boolean>;
}
