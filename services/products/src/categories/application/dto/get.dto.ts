import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetIdCategoryDTO {
  @ApiProperty({ type: String, description: 'Role id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
