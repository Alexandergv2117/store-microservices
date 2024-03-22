import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/application/dto/create.dto';
import { ICreateProductService } from 'src/products/application/services/create/create.interface';
import { CreateProductService } from 'src/products/application/services/create/create.service';
import { IDeleteProductService } from 'src/products/application/services/delete/delete.interface';
import { DeleteProductService } from 'src/products/application/services/delete/delete.service';
import { IGetProductService } from 'src/products/application/services/get/get.interface';
import { GetProductService } from 'src/products/application/services/get/get.service';
import { GetIdDTO } from 'src/shared/application/dto/getId.dto';
import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    @Inject(CreateProductService)
    private readonly createService: ICreateProductService,
    @Inject(GetProductService)
    private readonly getService: IGetProductService,
    @Inject(DeleteProductService)
    private readonly deleteService: IDeleteProductService,
  ) {}
  @Post()
  async create(@Body() product: CreateProductDto) {
    return await this.createService.create(product);
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

  // TODO: Implement update method
  // @Put(':id')
  // async update() {
  //   return 'Update product';
  // }

  @Delete(':id')
  async delete(@Param() { id }: GetIdDTO) {
    return await this.deleteService.deleteOne({ id });
  }
}
