import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
