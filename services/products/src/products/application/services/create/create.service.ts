import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { Product } from 'src/shared/domain/entities/product.entity';
import {
  CATEGORY_REPOSITORY,
  PRODUCTS_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { CategoryRepository } from 'src/categories/domain/interfaces/category-repository.interface';
import { ICreateProductService } from './create.interface';
import { CreateProductDto } from '../../dto/create.dto';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import { getfield } from 'src/shared/infrastructure/utils/error';

@Injectable()
export class CreateProductService implements ICreateProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const existsCategory = await this.categoryRepository.findCategoriesByNames({
      categories: product.categories,
    });

    if (!existsCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const imageName = `products/${uuidv7()}.${product.image.mimetype.split('/')[1]}`;

    const imageSaved = await this.imageRepository.uploadImage({
      image: product.image,
      name: imageName,
    });

    if (!imageSaved) {
      throw new HttpException('Error saving image', HttpStatus.BAD_REQUEST);
    }

    try {
      const productSaved = await this.productRepository.createProduct({
        product: {
          id: product.id || uuidv7(),
          categories: existsCategory,
          currency: product.currency,
          description: product.description,
          image: imageName,
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
    } catch (error) {
      await this.imageRepository.deleteImage({ name: imageName });

      if (error.code === '23505') {
        const field = getfield(error.detail);
        throw new HttpException(`${field} already exists`, HttpStatus.CONFLICT);
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
