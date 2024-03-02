import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { RolesEntity } from '../../../role/domain/entities/roles.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  email: string;

  @Column({ unique: true, type: 'bigint', nullable: false })
  phone: number;

  @ManyToOne(() => RolesEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
