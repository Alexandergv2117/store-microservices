import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_TYPE } from '../env';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { RolesEntity } from 'src/role/domain/entities/roles.entity';

export const ORM =
  DB_TYPE === 'relacional'
    ? TypeOrmModule.forFeature([UserEntity, RolesEntity])
    : null;
