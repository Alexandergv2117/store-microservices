import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  @Post()
  async create() {
    return 'Create product';
  }

  @Get()
  async findAll() {
    return 'Find all products';
  }

  @Get(':id')
  async findById() {
    return 'Find product by id';
  }

  @Put(':id')
  async update() {
    return 'Update product';
  }

  @Delete(':id')
  async delete() {
    return 'Delete product';
  }
}
