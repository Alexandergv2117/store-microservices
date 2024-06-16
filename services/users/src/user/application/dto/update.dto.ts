import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'User image',
    required: false,
  })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  phone?: number;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  role?: string;
}
