import { Global, Module } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { GetCategoryService } from './application/services/get/get.service';
import { DeleteCategoryService } from './application/services/delete/delete.service';
import { CreateCategoryService } from './application/services/create/create.service';
import { UpdateCategoryService } from './application/services/update/update.service';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { ORM } from 'src/shared/infrastructure/config/orm';

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
