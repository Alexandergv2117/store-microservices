import { Entity, PrimaryColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { DetailsEntity } from 'src/details/domain/entities/details.entity';
import { ImagesEntity } from 'src/images/domain/entities/images.entity';
import { ProductsCategoriesEntity } from './products_categories.entity';

export enum Currency {
  USD = 'USD',
  MXN = 'MXN',
}

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

  @OneToOne(() => DetailsEntity, (details) => details.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  details: DetailsEntity;

  @OneToMany(() => ImagesEntity, (image) => image.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: ImagesEntity[];

  @OneToMany(
    () => ProductsCategoriesEntity,
    (productCategory) => productCategory.product,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  productCategory: ProductsCategoriesEntity[];
}
