import { Global, Module } from '@nestjs/common';

import { ORM } from 'src/shared/infrastructure/config/orm';
import { PRODUCTS_REPOSITORY } from 'src/shared/infrastructure/config/repository';
import { UpdateService } from './application/services/update/update.service';
import { DeleteProductService } from './application/services/delete/delete.service';
import { GetProductService } from './application/services/get/get.service';
import { CreateProductService } from './application/services/create/create.service';
import { ProductController } from './infrastructure/controllers/product.controller';

@Global()
@Module({
  imports: [ORM],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetProductService,
    UpdateService,
    DeleteProductService,
    PRODUCTS_REPOSITORY,
  ],
  exports: [PRODUCTS_REPOSITORY],
})
export class ProductsModule {}
