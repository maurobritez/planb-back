import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { envs } from './config/dotenv-config';
import { ServicesModule } from './services/services.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { JourneyModule } from './journey/journey.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: Number(envs.DB_PORT),
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      //synchronize: false,
      //retryDelay: 3000,
      //retryAttempts: 10,
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    ServiceTypeModule,
    JourneyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
