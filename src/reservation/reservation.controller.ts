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
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ) {
    console.log("createReservationDto", createReservationDto);
    const reservation = await this.reservationService.create(createReservationDto, req.user.id);
    return { status: 200, message: 'Reservation created successfully', reservation };
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
    return this.reservationService.up_compingForGuide(req.user.id);
  }

  @Get('/past_reservations')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getPastReservations(@Request() req: any) {
    return this.reservationService.past_reservationsForGuide(req.user.id);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getReservationById(@Param('id') id: string , @Request() req:any) {
    return this.reservationService.getReservationById(id , req.user.id);
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
