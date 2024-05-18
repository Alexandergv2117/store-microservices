import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_TYPE } from '../env';
import { CategoriesEntity } from '../models/category-type-orm.entity';
import { ProductsEntity } from '../models/product-type-orm.entity';
import { ProductsCategoriesEntity } from '../models/product-category-type-orm.entity';

export const ORM =
  DB_TYPE === 'relacional'
    ? TypeOrmModule.forFeature([
        ProductsEntity,
        CategoriesEntity,
        ProductsCategoriesEntity,
      ])
    : null;
