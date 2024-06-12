import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { Category } from 'src/shared/domain/entities/category.entity';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';

@Injectable()
export class CategoryRepositoryPostgres implements CategoryRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}
  findCategotiesByIds({ ids }: { ids: string[] }): Promise<Category[]> {
    const categories: Category[] = [];

    ids.forEach(async (id) => {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (category) {
        categories.push(category);
      }
    });

    return Promise.resolve(categories);
  }

  async findCategoriesByNames({
    categories,
  }: {
    categories: string[];
  }): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        category: In(categories),
      },
    });
  }

  findCategoryByName({ category }: { category: string }): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { category },
    });
  }

  createCategory({ category }: { category: Category }): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  findAllCategories({
    limit = 10,
    page = 1,
    search,
  }: PaginationDTO & SearchDTO): Promise<[Category[], number]> {
    return this.categoryRepository.findAndCount({
      where: search
        ? [
            { category: Like(`%${search}%`) },
            { description: Like(`%${search}%`) },
          ]
        : {},
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findCategoryById({ id }: { id: string }): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async updateCategory({
    category,
    id,
  }: {
    id: string;
    category: Category;
  }): Promise<Category> {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existingCategory) {
        return null;
      }

      this.categoryRepository.merge(existingCategory, category);

      const updatedCategory =
        await this.categoryRepository.save(existingCategory);

      return updatedCategory;
    } catch (error) {
      return null;
    }
  }

  async deleteCategory({ id }: { id: string }): Promise<boolean> {
    try {
      const isDalete = await this.categoryRepository.delete(id);
      return isDalete.affected > 0;
    } catch (error) {
      return false;
    }
  }
}
