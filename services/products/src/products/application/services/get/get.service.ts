import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { Product } from 'src/shared/domain/entities/product.entity';
import { PRODUCTS_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { IGetProductService } from './get.interface';

@Injectable()
export class GetProductService implements IGetProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  async getAll({ limit, page, search }: PaginationDTO & SearchDTO): Promise<{
    data: Product[];
    total: number;
  }> {
    const [data, total] = await this.productRepository.findAllProducts({
      limit,
      page,
      search,
    });

    if (!total) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
      total,
    };
  }
  async getOneById({ id }: { id: string }): Promise<Product> {
    const product = await this.productRepository.findProductById({ id });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
