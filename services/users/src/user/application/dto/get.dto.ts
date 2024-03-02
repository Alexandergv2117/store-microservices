import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetIdUserDTO {
  @ApiProperty({ type: String, description: 'User id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
