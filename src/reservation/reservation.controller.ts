import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards, Query} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ) {
    return this.reservationService.create(createReservationDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get('/check_availability')
  async checkAvailability(
    @Query() params: {
      date:string ,
      experienceId: string , 
      requestedQty: number
    }
  ) {
    return await this.reservationService.checkDateAvailability(
      params.date,
      params.experienceId,
      params.requestedQty,
    );
  }

  @Get('/upcoming_reservations')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getUpcomingReservations(@Request() req: any) {
    return this.reservationService.up_comping(req.user.id);
  }

  @Get('/past_reservations')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getPastReservations(@Request() req: any) {
    return this.reservationService.past_reservations(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }
}
