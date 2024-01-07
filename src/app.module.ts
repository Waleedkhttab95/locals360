import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GuideModule } from './guide/guide.module';
import { GuideRequestModule } from './guide-request/guide-request.module';
import { ExperienceModule } from './experience/experience.module';
import { ReservationModule } from './reservation/reservation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilitiesModule } from './utilities/utilities.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { ExperienceItemModule } from './experience_item/experience_item.module';
import { UploadModule } from './upload/upload.module';
import { CityModule } from './city/city.module';
import { LocationModule } from './location/location.module';
import { RatingModule } from './rating/rating.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true ,
    envFilePath: './.env'
  }) ,
  MongooseModule.forRoot(
    process.env.DB_URI
  ),
  AuthModule,
  UsersModule,
  GuideModule,
  GuideRequestModule,
  ExperienceModule,
  ReservationModule,
  UtilitiesModule,
  EmailModule,
  NotificationModule,
  ExperienceItemModule,
  UploadModule,
  CityModule,
  LocationModule,
  RatingModule,
  TransactionModule
   ],
  controllers: [AppController],
  providers: [AppService, EmailService, NotificationService],
})
export class AppModule {}
