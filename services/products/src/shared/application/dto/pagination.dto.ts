import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => value && parseInt(value, 10))
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => value && parseInt(value, 10))
  limit: number = 10;
}
