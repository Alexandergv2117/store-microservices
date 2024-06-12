import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IDeleteCategoriesServices } from './delete-categories.interface';
import { PRODUCTS_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';

@Injectable()
export class DeleteCategoriesService implements IDeleteCategoriesServices {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  async deleteCategories({
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

    if (existProduct.categories.length === 0) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }

    const deletedCategories = await this.productRepository.deleteCategories({
      product: existProduct,
      categories,
    });

    if (!deletedCategories) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Categories deleted', HttpStatus.OK);
  }
}
