import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsEntity } from 'src/shared/infrastructure/models/product-type-orm.entity';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';
import { UpdateService } from './application/services/update/update.service';
import { DeleteProductService } from './application/services/delete/delete.service';
import { GetProductService } from './application/services/get/get.service';
import { CreateProductService } from './application/services/create/create.service';
import { ProductRepositoryPostgres } from './infrastructure/repositories/product-repository.postgres';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductsCategoriesEntity } from 'src/shared/infrastructure/models/product-category-type-orm.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      CategoriesEntity,
      ProductsCategoriesEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetProductService,
    UpdateService,
    DeleteProductService,
    ProductRepositoryPostgres,
  ],
  exports: [ProductRepositoryPostgres],
})
export class ProductsModule {}
