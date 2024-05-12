import { PartialType } from '@nestjs/mapped-types';
import { CreateJourneyDto } from './create-journey.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {
  @IsString()
  @IsOptional()
  week?: string;

  @IsString()
  @IsOptional()
  day?: string;

  @IsString()
  @IsOptional()
  hour?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
