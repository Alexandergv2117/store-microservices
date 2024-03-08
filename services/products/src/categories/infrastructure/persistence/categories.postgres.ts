import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import {
  InsertResult,
  UpdateResult,
  DeleteResult,
  Repository,
  Like,
} from 'typeorm';

@Injectable()
export class CategoriesRepositoryPostgres implements ICategoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}

  findAll({
    limit = 10,
    page = 1,
    search,
  }: PaginationDTO & SearchDTO): Promise<[CategoriesEntity[], number]> {
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
  findById({ id }: { id: string }): Promise<CategoriesEntity> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }
  findByCategory({
    category,
  }: {
    category: string;
  }): Promise<CategoriesEntity> {
    return this.categoryRepository.findOne({
      where: { category },
    });
  }
  create(data: CategoriesEntity): Promise<InsertResult> {
    return this.categoryRepository.insert(data);
  }
  update({
    id,
    category,
  }: {
    id: string;
    category: CategoriesEntity;
  }): Promise<UpdateResult> {
    return this.categoryRepository.update(id, category);
  }
  delete({ id }: { id: string }): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
