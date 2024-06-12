import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';
import { DB_TYPE } from '../env';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/repositories/product-repository.postgres';
import { ImageRepository } from '../repository/file.repository';

export const CATEGORY_REPOSITORY =
  DB_TYPE === 'relacional' ? CategoryRepositoryPostgres : null;

export const PRODUCTS_REPOSITORY =
  DB_TYPE === 'relacional' ? ProductRepositoryPostgres : null;

export const UPLOAD_IMAGE_REPOSITORY = ImageRepository;
