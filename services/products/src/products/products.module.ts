import { Global, Module } from '@nestjs/common';

import { ORM } from 'src/shared/infrastructure/config/orm';
import {
  PRODUCTS_REPOSITORY,
  UPLOAD_IMAGE_REPOSITORY,
} from 'src/shared/infrastructure/config/repository';
import { DeleteProductService } from './application/services/delete/delete.service';
import { GetProductService } from './application/services/get/get.service';
import { CreateProductService } from './application/services/create/create.service';
import { ProductController } from './infrastructure/controllers/product.controller';
import { UpdateProductService } from './application/services/update-product/update-product.service';

@Global()
@Module({
  imports: [ORM],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetProductService,
    DeleteProductService,
    PRODUCTS_REPOSITORY,
    UPLOAD_IMAGE_REPOSITORY,
    UpdateProductService,
  ],
  exports: [PRODUCTS_REPOSITORY],
})
export class ProductsModule {}
