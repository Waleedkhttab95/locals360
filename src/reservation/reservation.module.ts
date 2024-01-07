import { Module, forwardRef } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Location } from 'src/location/entities/location.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { GuideModule } from 'src/guide/guide.module';
import { ExperienceModule } from '../experience/experience.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    UsersModule,
    GuideModule,
    TransactionModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
})
export class ReservationModule {}
