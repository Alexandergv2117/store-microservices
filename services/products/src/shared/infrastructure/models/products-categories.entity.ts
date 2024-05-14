import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from './product-type-orm.entity';
import { CategoriesEntity } from './category-type-orm.entity';

@Entity({ name: 'products_categories' })
export class ProductsCategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductsEntity, (product) => product.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;
}
