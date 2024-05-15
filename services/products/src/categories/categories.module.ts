import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './infrastructure/controllers/category.controller';
import { GetCategoryService } from './application/services/get/get.service';
import { DeleteCategoryService } from './application/services/delete/delete.service';
import { CreateCategoryService } from './application/services/create/create.service';
import { UpdateCategoryService } from './application/services/update/update.service';
import { CategoryRepositoryPostgres } from './infrastructure/repositories/category-repository.postgres';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoryController],
  providers: [
    GetCategoryService,
    CategoryRepositoryPostgres,
    DeleteCategoryService,
    CreateCategoryService,
    UpdateCategoryService,
  ],
  exports: [CategoryRepositoryPostgres],
})
export class CategoriesModule {}
