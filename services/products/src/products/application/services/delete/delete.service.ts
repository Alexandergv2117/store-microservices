import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  PRODUCTS_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import {
  IDeleteOneProductService,
  IDeleteProductService,
} from './delete.interface';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';

@Injectable()
export class DeleteProductService implements IDeleteProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}
  async deleteOne({ id }: IDeleteOneProductService): Promise<void> {
    const existsProduct = await this.productRepository.findProductById({ id });

    if (!existsProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const deleteProduct = await this.productRepository.deleteProduct({ id });

    if (!deleteProduct) {
      throw new HttpException('Product not deleted', HttpStatus.BAD_REQUEST);
    }

    const deleteImage = await this.imageRepository.deleteImage({
      name: existsProduct.image,
    });

    if (!deleteImage) {
      throw new HttpException('Image not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Product deleted', HttpStatus.OK);
  }
}
