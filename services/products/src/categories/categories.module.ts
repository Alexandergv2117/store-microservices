import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetCategoryService } from './application/services/get/get.service';
import { DeleteCategoryService } from './application/services/delete/delete.service';
import { CreateCategoryService } from './application/services/create/create.service';
import { UpdateCategoryService } from './application/services/update/update.service';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';
import { CategoryController } from './infrastructure/controllers/category.controller';

import { CATEGORY_REPOSITORY, DB_TYPE } from 'src/shared/infrastructure/env';

const ORM =
  DB_TYPE === 'relacional'
    ? TypeOrmModule.forFeature([CategoriesEntity])
    : null;

@Global()
@Module({
  imports: [ORM],
  controllers: [CategoryController],
  providers: [
    GetCategoryService,
    CATEGORY_REPOSITORY,
    DeleteCategoryService,
    CreateCategoryService,
    UpdateCategoryService,
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoriesModule {}
