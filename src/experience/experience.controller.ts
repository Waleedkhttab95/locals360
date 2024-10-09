import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { experienceResDto } from './dto/experienceRes.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GuideGuard } from 'src/guards/guide.guards';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Serialize(experienceResDto)
  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), GuideGuard)
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Get('/experience_city/:id')
  findByCity(@Param('id') id: string) {
    return this.experienceService.getExperienceByCity(id);
  }

  @Get('/experience_city_date/:id/:date/:qty')
  findByCityAndDate(@Param('id') id: string, @Param('date') date: string, @Param('qty') qty: number) {
    console.log(id, date, qty)
    return this.experienceService.getExperienceBasedOnCityAndDate(id, date,qty);
  }

  @Get('/experience_location/:long/:lat/:limit')
  findByLocation(
    @Param('long') long: string,
    @Param('lat') lat: string,
    @Param('limit') limit: number,
  ) {
    return this.experienceService.getNearestExperiencesBasedOnUserLocation(
      long,
      lat,
      limit,
    );
  }

  @Get('/experience_item/:code')
  findByItems(@Param('code') code: string) {
    return this.experienceService.getExperienceBasedOnItems(code);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), GuideGuard)
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
    @Request() req: any,
  ) {
    return this.experienceService.update(+id, updateExperienceDto, req.user.id);
  }

  @Patch('/pause/:experienceid')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), GuideGuard)
  pause(@Request() req: any, @Param('experienceid') experienceid: string) {
    return this.experienceService.pauseExperience(req.user.id, experienceid);
  }
}
