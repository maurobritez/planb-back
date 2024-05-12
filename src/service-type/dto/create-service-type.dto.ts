import { IsString, MinLength } from 'class-validator';

export class CreateServiceTypeDto {
  @IsString()
  @MinLength(1)
  type: string;

  @IsString()
  @MinLength(1)
  picture: string;
}
