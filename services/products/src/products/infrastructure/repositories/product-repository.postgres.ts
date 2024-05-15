import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { Product } from 'src/shared/domain/entities/product.entity';
import { CategoriesEntity } from 'src/shared/infrastructure/models/category-type-orm.entity';
import { ProductsEntity } from 'src/shared/infrastructure/models/product-type-orm.entity';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';

export class ProductRepositoryPostgres implements ProductRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
  ) {}

  async createProduct({
    product,
  }: {
    product: Product;
  }): Promise<Product | { message: string } | null> {
    const category = new CategoriesEntity();
    category.id = product.category.id;
    category.category = product.category.category;
    category.description = product.category.description;
    return this.productRepository.save({
      ...product,
      category,
    });
  }

  async findAllProducts({
    limit = 10,
    page = 1,
    search,
  }: PaginationDTO & SearchDTO): Promise<[Product[], number]> {
    const [products, total] = await this.productRepository.findAndCount({
      where: search
        ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]
        : {},
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return [products, total];
  }

  async findProductById({ id }: { id: string }): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return product;
  }

  async deleteProduct({ id }: { id: string }): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected > 0;
  }
}
