import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Currency } from 'src/shared/domain/entities/product.entity';

export class UpdateProductDto {
  @ApiProperty({ type: String, description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Product description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Product price',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiProperty({
    type: String,
    enum: Currency,
    description: 'Product currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currency?: Currency;

  @ApiProperty({ description: 'Product stock', type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  stock?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Product published',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  published?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Product image',
    required: false,
  })
  image?: Express.Multer.File;
}
