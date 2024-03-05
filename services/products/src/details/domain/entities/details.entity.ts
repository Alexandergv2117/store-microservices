import { Entity, PrimaryColumn, OneToOne, Column, JoinColumn } from 'typeorm';
import { ProductsEntity } from 'src/products/domain/entities/product.entity';

@Entity({ name: 'details' })
export class DetailsEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  details: Record<string, unknown>;

  @OneToOne(() => ProductsEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;
}
