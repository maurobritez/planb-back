import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './journey.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule, TypeOrmModule.forFeature([Journey])],
  controllers: [JourneyController],
  providers: [JourneyService],
})
export class JourneyModule {}
