import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/repositories/product-repository.postgres';
import {
  IDeleteOneProductService,
  IDeleteProductService,
} from './delete.interface';

@Injectable()
export class DeleteProductService implements IDeleteProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
    private readonly productRepository: ProductRepository,
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

    throw new HttpException('Product deleted', HttpStatus.OK);
  }
}
