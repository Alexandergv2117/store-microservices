import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductsCategoriesEntity } from './products-categories.entity';

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
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  productCategory: ProductsCategoriesEntity[];
}
