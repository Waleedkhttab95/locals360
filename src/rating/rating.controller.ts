import { Controller, Get, Post, Body, Request ,Param, UseGuards} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createRatingDto: CreateRatingDto , @Request() req:any) {

    return await this.ratingService.create(createRatingDto , req.user.id);
  }

  @Get(':/experienceid')
  findAll(@Param('experienceid') experienceid: string) {
    return this.ratingService.getExperienceReviews(experienceid);
  }


}
