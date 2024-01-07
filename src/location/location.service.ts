import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-locaton.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
    constructor(

    @InjectModel(Location.name)
    private readonly locationRepository: Model<Location>,
    ){}

    async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
        const location = await this.locationRepository.create(createLocationDto);
        await location.save()
        return location;
      }


      async findAll(){
          const locations = await this.locationRepository.find();
          return locations
      }
}
