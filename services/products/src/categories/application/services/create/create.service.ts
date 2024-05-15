import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { Category } from 'src/shared/domain/entities/category.entity';
import { getfield } from 'src/shared/infrastructure/utils/error';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';
import { ICreateCategoryService } from './create.interface';
import { CreateCategoryDto } from '../../dto/create.dto';

@Injectable()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(
    @Inject(CategoryRepositoryPostgres)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const existsCategory = await this.categoryRepository.findCategoryByName({
      category: category.category,
    });

    if (existsCategory) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = new Category(
      category.id || uuidv7(),
      category.category,
      category.description,
    );

    try {
      await this.categoryRepository.createCategory({ category: newCategory });
      return await this.categoryRepository.findCategoryById({
        id: newCategory.id,
      });
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
