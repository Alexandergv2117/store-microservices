import { Module } from '@nestjs/common';
import { ProductsEntity } from './domain/entities/product.entity';
import { ProductsCategoriesEntity } from './domain/entities/products_categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, ProductsCategoriesEntity]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductsModule {}
