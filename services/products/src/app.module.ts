import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresqlConfig } from './shared/infrastructure/config/postgreSQL.config';
import { DB_TYPE } from './shared/infrastructure/env';

const ORM =
  DB_TYPE === 'relacional' ? TypeOrmModule.forRoot(postgresqlConfig) : null;

@Module({
  imports: [ORM, CategoriesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
