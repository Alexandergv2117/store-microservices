import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';

@Entity({ name: 'images' })
export class ImagesEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @ManyToOne(() => ProductsEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;
}
