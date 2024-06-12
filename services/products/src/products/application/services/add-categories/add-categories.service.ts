import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAddCategoriesService } from './add-categories.interface';
import {
  CATEGORY_REPOSITORY,
  PRODUCTS_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';

@Injectable()
export class AddCategoriesService implements IAddCategoriesService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async addCategoriesToProduct({
    categories,
    id,
  }: {
    id: string;
    categories: string[];
  }): Promise<void> {
    const existProduct = await this.productRepository.findProductById({ id });

    if (!existProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const existCategories = await this.categoryRepository.findCategotiesByIds({
      ids: categories,
    });

    if (existCategories.length === 0) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }

    const newCategories = existCategories.filter(
      (category) =>
        !existProduct.categories.find((cat) => cat.id === category.id),
    );

    existProduct.categories.push(...newCategories);

    const addCategories = await this.productRepository.addCategories({
      product: existProduct,
    });

    if (!addCategories) {
      throw new HttpException(
        'Error adding categories',
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException('Categories added successfully', HttpStatus.OK);
  }
}
