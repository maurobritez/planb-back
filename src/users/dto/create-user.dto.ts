import { UserRole } from '../user.entity';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  birthDate?: string;
  email: string;
  pass: string;
  role?: UserRole;
}
