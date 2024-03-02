import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, type: 'number' })
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: number;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
