import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGetProductService } from './get.interface';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/repositories/product-repository.postgres';
import { Product } from 'src/shared/domain/entities/product.entity';

@Injectable()
export class GetProductService implements IGetProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
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
