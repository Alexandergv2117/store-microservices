import { Role } from './roles';

export class User {
  id: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
  image: string;
  email: string;
  phone: number;
  role: Role;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  constructor(
    id: string,
    username: string,
    password: string,
    name: string,
    lastname: string,
    image: string,
    email: string,
    phone: number,
    role: Role,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.image = image;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }
}
