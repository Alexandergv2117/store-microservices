import { CreateCategoryDto } from '../../dto/create.dto';
import { Category } from 'src/shared/domain/entities/category.entity';

export interface ICreateCategoryService {
  create(category: CreateCategoryDto): Promise<Category>;
}
