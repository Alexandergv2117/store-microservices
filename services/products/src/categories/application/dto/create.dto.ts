import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: 'string', description: 'Category id' })
  @IsOptional()
  @IsString()
  @IsUUID()
  id?: string;

  @ApiProperty({ type: 'string', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: 'string', description: 'Category description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
