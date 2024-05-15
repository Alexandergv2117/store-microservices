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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { CreateCategoryDto } from 'src/categories/application/dto/create.dto';
import { GetIdCategoryDTO } from 'src/categories/application/dto/get.dto';
import { UpdateCategoryDTO } from 'src/categories/application/dto/update.dto';
import { ICreateCategoryService } from 'src/categories/application/services/create/create.interface';
import { CreateCategoryService } from 'src/categories/application/services/create/create.service';
import { IDeleteCategoryService } from 'src/categories/application/services/delete/delete.interface';
import { DeleteCategoryService } from 'src/categories/application/services/delete/delete.service';
import { IGetCategoriesService } from 'src/categories/application/services/get/get.interface';
import { GetCategoryService } from 'src/categories/application/services/get/get.service';
import { IUpdateCategoryService } from 'src/categories/application/services/update/update.interface';
import { UpdateCategoryService } from 'src/categories/application/services/update/update.service';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    @Inject(GetCategoryService)
    private readonly getService: IGetCategoriesService,
    @Inject(DeleteCategoryService)
    private readonly deleteService: IDeleteCategoryService,
    @Inject(CreateCategoryService)
    private readonly createService: ICreateCategoryService,
    @Inject(UpdateCategoryService)
    private readonly updateService: IUpdateCategoryService,
  ) {}

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.createService.create(category);
  }

  @Get()
  async getAllCategory(
    @Query() pagination: PaginationDTO,
    @Query() search: SearchDTO,
  ) {
    const categories = await this.getService.getAll({
      ...pagination,
      ...search,
    });

    return {
      data: {
        categories: categories.data,
      },
      total: categories.total,
    };
  }

  @Get(':id')
  async getCategory(@Param() { id }: GetIdCategoryDTO) {
    return await this.getService.getOneById({ id });
  }

  @Put(':id')
  async updateCategory(
    @Param() { id }: GetIdCategoryDTO,
    @Body() category: UpdateCategoryDTO,
  ) {
    return await this.updateService.updateOne({
      id,
      category,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param() { id }: GetIdCategoryDTO) {
    return await this.deleteService.deleteOne({ id });
  }
}
