import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import {
  PRODUCTS_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { IUpdateProductService } from './update-product.interface';
import { UpdateProductDto } from '../../dto/update-product.dto';

@Injectable()
export class UpdateProductService implements IUpdateProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}
  updateProduct(data: {
    productId: string;
    updateProduct: UpdateProductDto;
  }): Promise<void> {
    console.log('Updating product...');
    console.log('Product updated');
    console.log(data);

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
