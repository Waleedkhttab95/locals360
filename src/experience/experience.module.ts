import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Slots, SlotsSchema } from './entities/slots.entity';
import { ReservationModule } from 'src/reservation/reservation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GuideModule } from 'src/guide/guide.module';
import { UsersModule } from 'src/users/users.module';
import { LocationModule } from 'src/location/location.module';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService],
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: Slots.name, schema: SlotsSchema },
    ]),
    GuideModule,
    UsersModule,
    LocationModule,
    ReservationModule,
    MulterModule.register({
      dest: './uploads', // specify the destination directory for temporary storage
    }),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
    ]),
    ExperienceService
  ],
})
export class ExperienceModule {}
