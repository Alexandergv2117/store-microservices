import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IGetCategoriesService } from './get.interface';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { Category } from 'src/shared/domain/entities/category.entity';

@Injectable()
export class GetCategoryService implements IGetCategoriesService {
  constructor(
    @Inject(CategoryRepositoryPostgres)
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
