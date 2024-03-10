import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class GetProductDto {
  @ApiProperty({ type: 'string', description: 'Product id' })
  @IsString()
  @IsUUID()
  id: string;

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

  @ApiProperty({ type: 'string', description: 'Product currency' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ type: 'number', description: 'Product stock' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ type: 'boolean', description: 'Product published' })
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
