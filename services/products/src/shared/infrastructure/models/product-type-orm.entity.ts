import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Currency } from 'src/shared/domain/entities/product.entity';
import { CategoriesEntity } from './category-type-orm.entity';

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

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;
}
