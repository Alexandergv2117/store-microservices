import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IDeleteOneProductService,
  IDeleteProductService,
} from './delete.interface';
import { IProductsRepository } from 'src/products/domain/product.repository';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/persistence/product.postgres';

@Injectable()
export class DeleteProductService implements IDeleteProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
    private readonly productRepository: IProductsRepository,
  ) {}
  async deleteOne({ id }: IDeleteOneProductService): Promise<void> {
    const existsProduct = await this.productRepository.findById({ id });

    if (!existsProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const deleteProduct = await this.productRepository.delete({ id });

    if (deleteProduct.affected === 0) {
      throw new HttpException('Product not deleted', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Product deleted', HttpStatus.OK);
  }
}
