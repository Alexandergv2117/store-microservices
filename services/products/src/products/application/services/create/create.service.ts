import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { Product } from 'src/shared/domain/entities/product.entity';
import {
  CATEGORY_REPOSITORY,
  PRODUCTS_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { ICreateProductService } from './create.interface';
import { CreateProductDto } from '../../dto/create.dto';

@Injectable()
export class CreateProductService implements ICreateProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const existsCategory = await this.categoryRepository.findCategoriesByNames({
      categories: product.categories,
    });

    if (!existsCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const productSaved = await this.productRepository.createProduct({
      product: {
        id: product.id || uuidv7(),
        categories: existsCategory,
        currency: product.currency,
        description: product.description,
        image: '',
        name: product.name,
        price: product.price,
        published: product.published,
        stock: product.stock,
      },
    });

    if ('message' in productSaved) {
      throw new HttpException(productSaved.message, HttpStatus.BAD_REQUEST);
    }

    return productSaved;
  }
}
