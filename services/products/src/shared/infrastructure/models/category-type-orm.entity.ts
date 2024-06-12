import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductsCategoriesEntity } from './product-category-type-orm.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToMany(
    () => ProductsCategoriesEntity,
    (productCategory) => productCategory.category,
  )
  products: ProductsCategoriesEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
