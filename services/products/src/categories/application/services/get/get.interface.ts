import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

export interface IGetCategoriesService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: CategoriesEntity[]; total: number }>;
  getOneById(data: { id: string }): Promise<CategoriesEntity>;
}
