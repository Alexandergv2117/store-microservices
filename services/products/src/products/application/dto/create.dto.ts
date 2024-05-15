import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Currency } from 'src/shared/domain/entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ type: 'string', description: 'Product id' })
  @IsOptional()
  @IsString()
  @IsUUID()
  id?: string;

  @ApiProperty({ type: 'string', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', description: 'Product image' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: 'string', description: 'Product price' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: 'string',
    enum: Currency,
    description: 'Product currency',
  })
  @IsString()
  @IsNotEmpty()
  currency: Currency;

  @ApiProperty({ type: 'number', description: 'Product stock' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ type: 'boolean', description: 'Product published' })
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Producrt category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
