import { Module } from '@nestjs/common';
import { ProductsEntity } from './domain/entities/product.entity';
import { ProductsCategoriesEntity } from './domain/entities/products_categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, ProductsCategoriesEntity]),
  ],
  controllers: [],
  providers: [],
})
export class ProductsModule {}
