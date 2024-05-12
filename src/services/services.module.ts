import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { UsersModule } from 'src/users/users.module';
import { ServiceTypeModule } from 'src/service-type/service-type.module';

@Module({
  imports: [
    UsersModule,
    ServiceTypeModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
