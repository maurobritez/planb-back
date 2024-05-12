import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  // tal vez mejor enviar el valor trimeado desde el front
  //@Transform(({ value }) => value.trim())
  pass: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Invalid role. Allowed values: admin, user, premium',
  })
  role?: UserRole;
}
