import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { CategoriesEntity } from './entities/categories.entity';

export interface ICategoriesRepository {
  findAll(
    data: PaginationDTO & SearchDTO,
  ): Promise<[CategoriesEntity[], number]>;
  findById(data: { id: string }): Promise<CategoriesEntity>;
  findByCategory(data: { category: string }): Promise<CategoriesEntity>;
  create(data: CategoriesEntity): Promise<InsertResult>;
  update(data: {
    id: string;
    category: CategoriesEntity;
  }): Promise<UpdateResult>;
  delete(data: { id: string }): Promise<DeleteResult>;
}
