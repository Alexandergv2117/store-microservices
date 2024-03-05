import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from './product.entity';
import { CategoriesEntity } from 'src/categories/domain/entities/categories.entity';

@Entity({ name: 'products_categories' })
export class ProductsCategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductsEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;
}
