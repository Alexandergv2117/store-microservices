import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Category } from 'src/shared/domain/entities/category.entity';

export interface IGetCategoriesService {
  getAll(
    query: PaginationDTO & SearchDTO,
  ): Promise<{ data: Category[]; total: number }>;
  getOneById(data: { id: string }): Promise<Category>;
}
