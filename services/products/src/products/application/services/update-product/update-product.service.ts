import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/interfaces/product-repository.interface';
import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import {
  PRODUCTS_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { IUpdateProductService } from './update-product.interface';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { uuidv7 } from 'uuidv7';
import { Product } from 'src/shared/domain/entities/product.entity';

@Injectable()
export class UpdateProductService implements IUpdateProductService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(UPLOAD_IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}
  async updateProduct({
    productId,
    updateProduct,
  }: {
    productId: string;
    updateProduct: UpdateProductDto;
  }): Promise<Product> {
    const product = await this.productRepository.findProductById({
      id: productId,
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (updateProduct.image) {
      const imageName = `products/${uuidv7()}.${updateProduct.image.mimetype.split('/')[1]}`;

      const deleteImage = await this.imageRepository.deleteImage({
        name: product.image,
      });

      if (!deleteImage) {
        throw new HttpException('Error deleting image', HttpStatus.BAD_REQUEST);
      }

      const imageSaved = await this.imageRepository.uploadImage({
        image: updateProduct.image,
        name: imageName,
      });

      if (!imageSaved) {
        throw new HttpException('Error saving image', HttpStatus.BAD_REQUEST);
      }

      product.image = imageName;
    }

    product.name = updateProduct.name || product.name;
    product.description = updateProduct.description || product.description;
    product.price = updateProduct.price || product.price;
    product.currency = updateProduct.currency || product.currency;
    product.stock = updateProduct.stock || product.stock;
    product.published = updateProduct.published || product.published;

    const result = await this.productRepository.updateProduct({
      id: productId,
      product,
    });

    if (!result) {
      throw new HttpException('Product not updated', HttpStatus.BAD_REQUEST);
    }

    return product;
  }
}
