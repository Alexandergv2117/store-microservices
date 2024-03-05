import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGetCategoriesService } from './get.interface';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { CategoriesRepositoryPostgres } from 'src/categories/infrastructure/persistence/categories.postgres';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';

@Injectable()
export class GetCategoryService implements IGetCategoriesService {
  constructor(
    @Inject(CategoriesRepositoryPostgres)
    private readonly categoryRepository: ICategoriesRepository,
  ) {}

  async getAll(query: PaginationDTO & SearchDTO): Promise<{
    data: CategoriesEntity[];
    total: number;
  }> {
    const [data, total] = await this.categoryRepository.findAll({
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
  async getOneById({ id }: { id: string }): Promise<CategoriesEntity> {
    const category = await this.categoryRepository.findById({ id });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
