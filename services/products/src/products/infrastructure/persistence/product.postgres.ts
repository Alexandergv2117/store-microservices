import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { IProductsRepository } from 'src/products/domain/product.repository';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { DeleteResult, Repository, InsertResult, Like } from 'typeorm';

@Injectable()
export class ProductRepositoryPostgres implements IProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
  ) {}
  create({ product }: { product: ProductsEntity }): Promise<InsertResult> {
    return this.productRepository.insert(product);
  }
  findAll({
    limit,
    page,
    search,
  }: PaginationDTO & SearchDTO): Promise<[ProductsEntity[], number]> {
    return this.productRepository.findAndCount({
      where: search
        ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]
        : {},
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  findById({ id }: { id: string }): Promise<ProductsEntity> {
    return this.productRepository.findOne({
      where: { id },
    });
  }
  delete({ id }: { id: string }): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
