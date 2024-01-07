import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './entities/location.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports:[ MongooseModule.forFeature([
    { name: Location.name, schema: LocationSchema }
  ])],
  exports:[LocationService]
})
export class LocationModule {}
