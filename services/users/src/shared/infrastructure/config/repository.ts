import { PasswordRepository } from 'src/user/infrastructure/utils/password.repository';
import { ImageRepository } from '../repository/file.repository';
import { UserRepositortPostgres } from 'src/user/infrastructure/persistence/user.postgres';
import { DB_TYPE } from '../env';
import { RolesRepositoryPostgres } from 'src/role/infrastructure/persistence/role.postgres';

export const UPLOAD_IMAGE_REPOSITORY = ImageRepository;
export const PASSWORD_REPOSITORY = PasswordRepository;
export const USER_REPOSITORY =
  DB_TYPE === 'relacional' ? UserRepositortPostgres : null;

export const ROLES_REPOSITORY =
  DB_TYPE === 'relacional' ? RolesRepositoryPostgres : null;
