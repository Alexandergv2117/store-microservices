import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';
import { DB_TYPE } from '../env';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/repositories/product-repository.postgres';

export const CATEGORY_REPOSITORY =
  DB_TYPE === 'relacional' ? CategoryRepositoryPostgres : null;

export const PRODUCTS_REPOSITORY =
  DB_TYPE === 'relacional' ? ProductRepositoryPostgres : null;
