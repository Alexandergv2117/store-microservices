import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { CATEGORY_REPOSITORY } from 'src/shared/infrastructure/env';
import {
  IUpdateCategoryService,
  IUpdateOneCategoryService,
} from './update.interface';

@Injectable()
export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
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
