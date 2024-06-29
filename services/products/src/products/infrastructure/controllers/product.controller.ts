import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  GetIdCategoryDTO,
  GetIdDTO,
} from 'src/shared/application/dto/getId.dto';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { CreateProductDto } from 'src/products/application/dto/create.dto';
import { ICreateProductService } from 'src/products/application/services/create/create.interface';
import { CreateProductService } from 'src/products/application/services/create/create.service';
import { IDeleteProductService } from 'src/products/application/services/delete/delete.interface';
import { DeleteProductService } from 'src/products/application/services/delete/delete.service';
import { IGetProductService } from 'src/products/application/services/get/get.interface';
import { GetProductService } from 'src/products/application/services/get/get.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypePipe } from 'src/shared/application/pipes/files.validator.pipe';
import { validImg } from 'src/shared/infrastructure/utils/validFiles';
import { UpdateProductDto } from 'src/products/application/dto/update-product.dto';
import { UpdateProductService } from 'src/products/application/services/update-product/update-product.service';
import { IUpdateProductService } from 'src/products/application/services/update-product/update-product.interface';
import { DeleteCategoriesService } from 'src/products/application/services/delete-categories/delete-categories.service';
import { IDeleteCategoriesServices } from 'src/products/application/services/delete-categories/delete-categories.interface';
import { AddCategoriesService } from 'src/products/application/services/add-categories/add-categories.service';
import { IAddCategoriesService } from 'src/products/application/services/add-categories/add-categories.interface';

@Controller('')
@ApiTags('Product')
export class ProductController {
  constructor(
    @Inject(CreateProductService)
    private readonly createService: ICreateProductService,
    @Inject(GetProductService)
    private readonly getService: IGetProductService,
    @Inject(DeleteProductService)
    private readonly deleteService: IDeleteProductService,
    @Inject(DeleteCategoriesService)
    private readonly deleteCategoriesService: IDeleteCategoriesServices,
    @Inject(AddCategoriesService)
    private readonly addCategoriesService: IAddCategoriesService,
    @Inject(UpdateProductService)
    private readonly updateProductService: IUpdateProductService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() product: CreateProductDto,
    @UploadedFile(new FileTypePipe(validImg.extensions, validImg.mimeTypes))
    image: Express.Multer.File,
  ) {
    return await this.createService.create({
      ...product,
      image,
      published: product.published.toString() === 'true' ? true : false,
    });
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationDTO,
    @Query() search: SearchDTO,
  ) {
    return await this.getService.getAll({
      limit: pagination.limit,
      page: pagination.page,
      search: search.search,
    });
  }

  @Get(':id')
  async findById(@Param() { id }: GetIdDTO) {
    return await this.getService.getOneById({ id });
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param() { id }: GetIdDTO,
    @Body() product: UpdateProductDto,
    @UploadedFile(new FileTypePipe(validImg.extensions, validImg.mimeTypes))
    image: Express.Multer.File,
  ) {
    return await this.updateProductService.updateProduct({
      productId: id,
      updateProduct: { ...product, image },
    });
  }

  @Put(':id/category')
  async addCategory(
    @Param() { id }: GetIdDTO,
    @Body() { categories }: GetIdCategoryDTO,
  ) {
    return await this.addCategoriesService.addCategoriesToProduct({
      id,
      categories,
    });
  }

  @Delete(':id')
  async delete(@Param() { id }: GetIdDTO) {
    return await this.deleteService.deleteOne({ id });
  }

  @Delete(':id/category')
  async deleteCategory(
    @Param() { id }: GetIdDTO,
    @Body() { categories }: GetIdCategoryDTO,
  ) {
    return await this.deleteCategoriesService.deleteCategories({
      id,
      categories,
    });
  }
}
