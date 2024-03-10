import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductsRepository } from 'src/products/domain/product.repository';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/persistence/product.postgres';
import { IGetProductService } from './get.interface';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

@Injectable()
export class GetProductService implements IGetProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
    private readonly productRepository: IProductsRepository,
  ) {}
  async getAll({ limit, page, search }: PaginationDTO & SearchDTO): Promise<{
    data: ProductsEntity[];
    total: number;
  }> {
    const [data, total] = await this.productRepository.findAll({
      limit,
      page,
      search,
    });

    if (total === 0) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
      total,
    };
  }
  async getOneById({ id }: { id: string }): Promise<ProductsEntity> {
    const product = await this.productRepository.findById({ id });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
