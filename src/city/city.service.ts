import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './entities/city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CityService {

    constructor(
        @InjectModel(City.name)
        private readonly cityRepository: Model<City>,
      ) {}


    async createCity(createCityParams: CreateCityDto) {
        const city = await this.cityRepository.create(createCityParams);
        await city.save();
        return city;
      }
    
      async getAllCity() {
        return this.cityRepository.find();
      }
    
}
