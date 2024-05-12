import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceTypeDto } from './create-service-type.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateServiceTypeDto extends PartialType(CreateServiceTypeDto) {
  @IsString()
  @MinLength(1)
  @IsOptional()
  type: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  picture: string;
}
