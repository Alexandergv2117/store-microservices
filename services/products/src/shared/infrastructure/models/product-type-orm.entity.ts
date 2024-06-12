import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Currency } from 'src/shared/domain/entities/product.entity';
import { ProductsCategoriesEntity } from './product-category-type-orm.entity';

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  price: string;

  @Column({ type: 'enum', enum: Currency, nullable: false })
  currency: Currency;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ type: 'bool', nullable: false, default: true })
  published: boolean;

  @OneToMany(
    () => ProductsCategoriesEntity,
    (productCategory) => productCategory.product,
    {
      cascade: true,
    },
  )
  categories: ProductsCategoriesEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
