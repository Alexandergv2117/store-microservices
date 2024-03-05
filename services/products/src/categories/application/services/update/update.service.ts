import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IUpdateCategoryService,
  IUpdateOneCategoryService,
} from './update.interface';
import { CategoriesRepositoryPostgres } from 'src/categories/infrastructure/persistence/categories.postgres';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';

@Injectable()
export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(
    @Inject(CategoriesRepositoryPostgres)
    private readonly categoryRepository: ICategoriesRepository,
  ) {}
  async updateOne({ id, category }: IUpdateOneCategoryService): Promise<void> {
    const exists = await this.categoryRepository.findById({ id });

    if (!exists) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    exists.category = category.category || exists.category;
    exists.description = category.description || exists.description;

    const result = await this.categoryRepository.update({
      id,
      category: exists,
    });

    if (result.affected === 0) {
      throw new HttpException('Category not updated', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Category updated', HttpStatus.OK);
  }
}
