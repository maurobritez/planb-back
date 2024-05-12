import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  description: string;

  @IsNumber()
  @IsPositive()
  paymentChoice: number;

  // todo: no se si va este campo
  @IsOptional()
  creationDate: Date;

  @IsNumber()
  @IsPositive()
  serviceTypeId: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
