import { Module } from '@nestjs/common';
import { ImagesEntity } from './domain/entities/images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
  controllers: [],
  providers: [],
})
export class ImagesModule {}
