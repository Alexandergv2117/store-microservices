import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IDeleteCategoryService,
  IDeleteOneCateforyService,
} from './delete.interface';
import { CategoriesRepositoryPostgres } from 'src/categories/infrastructure/persistence/categories.postgres';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';

@Injectable()
export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(
    @Inject(CategoriesRepositoryPostgres)
    private readonly categoryRepository: ICategoriesRepository,
  ) {}

  async deleteOne({ id }: IDeleteOneCateforyService): Promise<void> {
    const existsCategory = await this.categoryRepository.findById({ id });

    if (!existsCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const deleteCategory = await this.categoryRepository.delete({ id });

    if (deleteCategory.affected === 0) {
      throw new HttpException('Category not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Category deleted', HttpStatus.OK);
  }
}
