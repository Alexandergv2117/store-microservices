import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

export interface IGetProductService {
  getAll(query: PaginationDTO & SearchDTO): Promise<{
    data: ProductsEntity[];
    total: number;
  }>;

  getOneById({ id }: { id: string }): Promise<ProductsEntity>;
}
