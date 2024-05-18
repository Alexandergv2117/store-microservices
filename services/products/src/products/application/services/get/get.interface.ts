import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Product } from 'src/shared/domain/entities/product.entity';

export interface IGetProductService {
  getAll(query: PaginationDTO & SearchDTO): Promise<{
    data: Product[];
    total: number;
  }>;

  getOneById({ id }: { id: string }): Promise<Product>;
}
