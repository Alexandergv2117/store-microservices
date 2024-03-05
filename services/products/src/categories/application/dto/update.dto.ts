import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
