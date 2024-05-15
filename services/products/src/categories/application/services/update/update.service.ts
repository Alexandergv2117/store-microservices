import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';
import {
  IUpdateCategoryService,
  IUpdateOneCategoryService,
} from './update.interface';

@Injectable()
export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(
    @Inject(CategoryRepositoryPostgres)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async updateOne({ id, category }: IUpdateOneCategoryService): Promise<void> {
    const exists = await this.categoryRepository.findCategoryById({ id });

    if (!exists) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    exists.category = category.category || exists.category;
    exists.description = category.description || exists.description;

    const result = await this.categoryRepository.updateCategory({
      id,
      category: exists,
    });

    if (!result) {
      throw new HttpException('Category not updated', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Category updated', HttpStatus.OK);
  }
}
