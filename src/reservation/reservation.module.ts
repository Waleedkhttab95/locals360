import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { Experience, ExperienceSchema } from 'src/experience/entities/experience.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { GuideModule } from 'src/guide/guide.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { Slots, SlotsSchema } from 'src/experience/entities/slots.entity';
import { Guide, GuideSchema } from 'src/guide/entities/guide.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Location, LocationSchema } from 'src/location/entities/location.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      {name : Experience.name, schema: ExperienceSchema},
      {name : Slots.name, schema: SlotsSchema},
      {name : Guide.name, schema: GuideSchema},
      {name : User.name, schema: UserSchema}
    ]),
    UsersModule,
    GuideModule,
    TransactionModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [
    ReservationService , 
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    
  ],
})
export class ReservationModule {}
