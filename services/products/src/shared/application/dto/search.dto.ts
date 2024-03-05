import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @ApiProperty({
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  search: string;
}
