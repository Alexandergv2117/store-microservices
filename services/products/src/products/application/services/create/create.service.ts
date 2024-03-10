import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICreateProductService } from './create.interface';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';
import { CreateProductDto } from '../../dto/create.dto';
import { IProductsRepository } from 'src/products/domain/product.repository';
import { ProductRepositoryPostgres } from 'src/products/infrastructure/persistence/product.postgres';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class CreateProductService implements ICreateProductService {
  constructor(
    @Inject(ProductRepositoryPostgres)
    private readonly productRepository: IProductsRepository,
  ) {}
  async create(product: CreateProductDto): Promise<ProductsEntity> {
    const newProduct = new ProductsEntity();
    newProduct.id = product.id || uuidv7();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.image = product.image;
    newProduct.price = product.price;
    newProduct.currency = product.currency;
    newProduct.stock = product.stock;
    newProduct.published = product.published;

    const productSaved = await this.productRepository.create({
      product: newProduct,
      categories: product.category,
    });

    if ('message' in productSaved) {
      throw new HttpException(productSaved.message, HttpStatus.BAD_REQUEST);
    }

    return productSaved;
  }
}
