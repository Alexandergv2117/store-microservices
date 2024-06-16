import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { UserEntity } from '../../../user/domain/entities/user.entity';

@Entity({ name: 'roles' })
export class RolesEntity {
  @PrimaryColumn({ unique: true, type: 'varchar', nullable: false })
  id: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  role: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
