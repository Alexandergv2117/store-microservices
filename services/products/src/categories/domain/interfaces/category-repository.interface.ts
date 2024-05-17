import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Category } from 'src/shared/domain/entities/category.entity';

export interface CategoryRepository {
  createCategory(data: { category: Category }): Promise<Category>;
  findAllCategories(
    data: PaginationDTO & SearchDTO,
  ): Promise<[Category[], number]>;
  findCategoryById(data: { id: string }): Promise<Category>;
  findCategoryByName(data: { category: string }): Promise<Category>;
  findCategotiesByIds(data: { ids: string[] }): Promise<Category[]>;
  findCategoriesByNames(data: { categories: string[] }): Promise<Category[]>;
  updateCategory(data: { id: string; category: Category }): Promise<Category>;
  deleteCategory(data: { id: string }): Promise<boolean>;
}
