import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { ICreateProductService } from './create.interface';
import { CreateProductDto } from '../../dto/create.dto';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/repositories/product-repository.postgres';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { Product } from 'src/shared/domain/entities/product.entity';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { CategoryRepositoryPostgres } from 'src/categories/infrastructure/repositories/category-repository.postgres';

@Injectable()
export class CreateProductService implements ICreateProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
    private readonly productRepository: ProductRepository,
    @Inject(CategoryRepositoryPostgres)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async create(product: CreateProductDto): Promise<Product> {
    const existsCategory = await this.categoryRepository.findCategoryByName({
      category: product.category,
    });

    if (!existsCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const productSaved = await this.productRepository.createProduct({
      product: {
        id: product.id || uuidv7(),
        category: existsCategory,
        currency: product.currency,
        description: product.description,
        image: product.image,
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
