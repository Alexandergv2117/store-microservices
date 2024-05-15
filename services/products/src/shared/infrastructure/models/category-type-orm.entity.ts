import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductsEntity } from './product-type-orm.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}
