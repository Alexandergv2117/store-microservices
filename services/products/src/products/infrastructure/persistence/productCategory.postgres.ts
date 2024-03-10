import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { ProductsCategoriesEntity } from 'src/products/domain/entities/products_categories.entity';
import { IProductCategoryRepository } from 'src/products/domain/product_category.repository';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductsCategoriesPostgres implements IProductCategoryRepository {
  constructor(
    @InjectRepository(ProductsCategoriesEntity)
    private readonly productCategoryRepository: Repository<ProductsCategoriesEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}
  delete(id: number[]): Promise<DeleteResult> {
    return this.productCategoryRepository.delete(id);
  }
  async create(data: {
    category: string;
    product: ProductsEntity;
  }): Promise<ProductsCategoriesEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: data.category },
    });

    if (!category) {
      return null;
    }

    const newProductCategory = new ProductsCategoriesEntity();
    newProductCategory.category = category;
    newProductCategory.product = data.product;
    return await this.productCategoryRepository.save(newProductCategory);
  }
}
