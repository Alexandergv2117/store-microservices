import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { CreateProductDto } from '../../dto/create.dto';

export interface ICreateProductService {
  create(product: CreateProductDto): Promise<ProductsEntity>;
}
