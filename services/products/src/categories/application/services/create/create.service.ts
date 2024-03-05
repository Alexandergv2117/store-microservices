import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICreateCategoryService } from './create.interface';
import { CreateCategoryDto } from '../../dto/create.dto';
import { CategoriesRepositoryPostgres } from 'src/categories/infrastructure/persistence/categories.postgres';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { uuidv7 } from 'uuidv7';
import { getfield } from 'src/shared/infrastructure/utils/error';

@Injectable()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(
    @Inject(CategoriesRepositoryPostgres)
    private readonly categoryRepository: ICategoriesRepository,
  ) {}

  async create(category: CreateCategoryDto): Promise<CategoriesEntity> {
    const existsCategory = await this.categoryRepository.findByCategory({
      category: category.category,
    });

    if (existsCategory) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = new CategoriesEntity();

    newCategory.id = category.id || uuidv7();
    newCategory.category = category.category;
    newCategory.description = category.description;

    try {
      await this.categoryRepository.create(newCategory);
      return await this.categoryRepository.findById({ id: newCategory.id });
    } catch (error) {
      if (error.code === '23505') {
        console.log(error.detail);
        const field = getfield(error.detail);
        throw new HttpException(`${field} already exists`, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Error creating category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
