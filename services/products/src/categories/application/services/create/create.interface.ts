import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { CreateCategoryDto } from '../../dto/create.dto';

export interface ICreateCategoryService {
  create(category: CreateCategoryDto): Promise<CategoriesEntity>;
}
