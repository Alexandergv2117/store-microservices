import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
  @ApiProperty({ type: 'string', description: 'Product id', required: false })
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

  @ApiProperty({ description: 'Product stock', type: Number })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ type: Boolean, description: 'Product published' })
  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @ApiProperty({
    type: 'string',
    isArray: true,
    description: 'Producrt category',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((item) => item.trim())
      : value,
  )
  categories: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Product image',
    required: true,
  })
  image: Express.Multer.File;
}
