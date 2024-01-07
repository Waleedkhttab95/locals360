import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCityDto } from './dto/create-city.dto';
import { CityService } from './city.service';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('city')
export class CityController {

    constructor(
        private readonly cityService: CityService,
      ) {}

    @Post('/city')
    @ApiBearerAuth('access-token')
     @UseGuards(AuthGuard('jwt') , AdminGuard)
    createCity(@Body() createCityDto: CreateCityDto) {
      return this.cityService.createCity(createCityDto);
    }
}
