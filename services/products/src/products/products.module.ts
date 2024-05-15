import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/controllers/product.controller';
import { CreateProductService } from './application/services/create/create.service';
import { GetProductService } from './application/services/get/get.service';
import { UpdateService } from './application/services/update/update.service';
import { DeleteProductService } from './application/services/delete/delete.service';
import { ProductRepositoryPostgres } from './infrastructure/repositories/product-repository.postgres';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';
import { ProductsEntity } from 'src/shared/infrastructure/models/product-type-orm.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, CategoriesEntity])],
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
