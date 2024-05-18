import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import {
  IDeleteCategoryService,
  IDeleteOneCateforyService,
} from './delete.interface';

@Injectable()
export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async deleteOne({ id }: IDeleteOneCateforyService): Promise<void> {
    const existsCategory = await this.categoryRepository.findCategoryById({
      id,
    });

    if (!existsCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const deleteCategory = await this.categoryRepository.deleteCategory({ id });

    if (!deleteCategory) {
      throw new HttpException('Category not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Category deleted', HttpStatus.OK);
  }
}
