import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Category } from 'src/shared/domain/entities/category.entity';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { CATEGORY_REPOSITORY } from 'src/shared/infrastructure/env';
import { IGetCategoriesService } from './get.interface';

@Injectable()
export class GetCategoryService implements IGetCategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAll(query: PaginationDTO & SearchDTO): Promise<{
    data: Category[];
    total: number;
  }> {
    const [data, total] = await this.categoryRepository.findAllCategories({
      limit: query.limit,
      page: query.page,
      search: query.search,
    });

    if (total === 0) {
      throw new HttpException('No categories found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
      total,
    };
  }

  async getOneById({ id }: { id: string }): Promise<Category> {
    const category = await this.categoryRepository.findCategoryById({ id });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
