import * as bcrypt from 'bcrypt';
import { IPasswordRepository } from '../../domain/password.repository';

export class PasswordRepository implements IPasswordRepository {
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
