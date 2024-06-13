import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { Product } from 'src/shared/domain/entities/product.entity';
import { ProductsEntity } from 'src/shared/infrastructure/models/product-type-orm.entity';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { ProductsCategoriesEntity } from 'src/shared/infrastructure/models/product-category-type-orm.entity';

export class ProductRepositoryPostgres implements ProductRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
    @InjectRepository(ProductsCategoriesEntity)
    private readonly productCategoryRepository: Repository<ProductsCategoriesEntity>,
  ) {}
  async createProduct({
    product,
  }: {
    product: Product;
  }): Promise<Product | { message: string } | null> {
    const productCreated = await this.productRepository.save({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      currency: product.currency,
      stock: product.stock,
      published: product.published,
    });

    for (const category of product.categories) {
      await this.productCategoryRepository.save({
        product: productCreated,
        category,
      });
    }

    const newProduct = await this.productRepository.findOne({
      where: { id: productCreated.id },
      relations: ['categories', 'categories.category'],
    });

    return newProduct as unknown as Product;
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
      relations: ['categories', 'categories.category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return [products as unknown as Product[], total];
  }

  async findProductById({ id }: { id: string }): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories', 'categories.category'],
    });

    return product as unknown as Product;
  }

  async updateProduct({
    id,
    product,
  }: {
    id: string;
    product: Product;
  }): Promise<Product> {
    try {
      const updateProduct = await this.productRepository.save({
        id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        currency: product.currency,
        stock: product.stock,
        published: product.published,
      });

      return updateProduct as unknown as Product;
    } catch (error) {
      return null;
    }
  }

  async addCategories({ product }: { product: Product }): Promise<boolean> {
    try {
      console.log(product.categories);
      for (const category of product.categories) {
        await this.productCategoryRepository.save({
          product: product as unknown as ProductsEntity,
          category,
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteProduct({ id }: { id: string }): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected > 0;
  }

  async deleteCategories({
    categories,
    product,
  }: {
    product: Product;
    categories: string[];
  }): Promise<boolean> {
    try {
      product.categories = product.categories.filter(
        (category) => !categories.includes(category.id),
      );

      for (const category of product.categories) {
        await this.productCategoryRepository.delete(category.id);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
