import { Module } from '@nestjs/common';
import { DetailsEntity } from './domain/entities/details.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetailsEntity])],
  controllers: [],
  providers: [],
})
export class DetailsModule {}
