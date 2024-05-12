import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  birthDate?: string;

  @IsBoolean()
  @IsOptional()
  emailC?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  phoneC?: boolean;

  @IsString()
  @IsOptional()
  dni?: string;

  @IsBoolean()
  @IsOptional()
  dniC?: boolean;
}
