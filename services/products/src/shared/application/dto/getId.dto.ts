import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetIdDTO {
  @ApiProperty({ type: String, description: 'Id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
