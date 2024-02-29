import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDTO {
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
