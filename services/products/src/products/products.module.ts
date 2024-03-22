import { Global, Module } from '@nestjs/common';
import { ProductsEntity } from './domain/entities/product.entity';
import { ProductsCategoriesEntity } from './domain/entities/products_categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/controllers/product.controller';
import { CreateProductService } from './application/services/create/create.service';
import { GetProductService } from './application/services/get/get.service';
import { UpdateService } from './application/services/update/update.service';
import { DeleteProductService } from './application/services/delete/delete.service';
import { ProductRepositoryPostgres } from './infrastructure/persistence/product.postgres';
import { ProductsCategoriesPostgres } from './infrastructure/persistence/productCategory.postgres';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      ProductsCategoriesEntity,
      CategoriesEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetProductService,
    UpdateService,
    DeleteProductService,
    ProductRepositoryPostgres,
    ProductsCategoriesPostgres,
  ],
  exports: [ProductRepositoryPostgres, ProductsCategoriesPostgres],
})
export class ProductsModule {}
