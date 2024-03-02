export interface IPasswordRepository {
  hashPassword(password: string): string;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
