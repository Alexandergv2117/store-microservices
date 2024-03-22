import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, Like, DataSource } from 'typeorm';
import { ICategoriesRepository } from 'src/categories/domain/categories.repository';
import { CategoriesRepositoryPostgres } from 'src/categories/infrastructure/persistence/categories.postgres';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { ProductsCategoriesEntity } from 'src/products/domain/entities/products_categories.entity';
import { IProductsRepository } from 'src/products/domain/product.repository';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { getfield } from 'src/shared/infrastructure/utils/error';

@Injectable()
export class ProductRepositoryPostgres implements IProductsRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
    @Inject(CategoriesRepositoryPostgres)
    private readonly categoryRepository: ICategoriesRepository,
  ) {}
  async create({
    product,
    categories,
  }: {
    product: ProductsEntity;
    categories: string[];
  }): Promise<ProductsEntity | { message: string }> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const productSaved = await queryRunner.manager.save(
        ProductsEntity,
        product,
      );

      if (!productSaved) {
        await queryRunner.rollbackTransaction();
        return { message: 'Error saving product' };
      }

      if (categories.length > 0) {
        for await (const category of categories) {
          const categoryFound = await this.categoryRepository.findById({
            id: category,
          });

          if (!categoryFound) {
            await queryRunner.rollbackTransaction();
            return { message: 'Category not found' };
          }

          const productCategory = new ProductsCategoriesEntity();
          productCategory.category = categoryFound;
          productCategory.product = productSaved;

          const productCategorySaved = await queryRunner.manager.save(
            ProductsCategoriesEntity,
            productCategory,
          );

          if (!productCategorySaved) {
            await queryRunner.rollbackTransaction();
            return { message: 'Error saving product category' };
          }
        }
      }
      await queryRunner.commitTransaction();
      return productSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        const field = getfield(error.detail);
        return { message: `Field ${field} already exists` };
      }
    } finally {
      await queryRunner.release();
    }
  }
  findAll({
    limit = 10,
    page = 1,
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
