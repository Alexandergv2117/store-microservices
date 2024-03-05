import { Module } from '@nestjs/common';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { CategoriesEntity } from './domain/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetCategoryService } from './application/services/get/get.service';
import { CategoriesRepositoryPostgres } from './infrastructure/persistence/categories.postgres';
import { DeleteCategoryService } from './application/services/delete/delete.service';
import { CreateCategoryService } from './application/services/create/create.service';
import { UpdateCategoryService } from './application/services/update/update.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoryController],
  providers: [
    GetCategoryService,
    CategoriesRepositoryPostgres,
    DeleteCategoryService,
    CreateCategoryService,
    UpdateCategoryService,
  ],
})
export class CategoriesModule {}
