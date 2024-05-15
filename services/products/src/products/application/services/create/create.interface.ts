import { CreateProductDto } from '../../dto/create.dto';

import { Product } from 'src/shared/domain/entities/product.entity';

export interface ICreateProductService {
  create(product: CreateProductDto): Promise<Product>;
}
