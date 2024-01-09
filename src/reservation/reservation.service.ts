import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import { MongoRepository, MoreThanOrEqual } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Location } from '../location/entities/location.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionService } from 'src/transaction/transaction.service';
import { Slots } from 'src/experience/entities/slots.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationRepository: Model<Reservation>,
    @InjectModel(Guide.name)
    private readonly guideRepository: Model<Guide>,
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    @InjectModel(Experience.name)
    private readonly experienceRepository: Model<Experience>,
    @InjectModel(Slots.name)
    private readonly slotsRepository: Model<Slots>,
    private transactonService : TransactionService
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('user Not found  !');

    const guide = await this.guideRepository.findById(
      createReservationDto.guideId,
    );

    if (!guide) throw new NotFoundException('Guide Not found  !');

    const experience = await this.experienceRepository.findById(createReservationDto.experience);

    if(!experience) throw new NotFoundException('Experience not found')

    const transaction = await this.transactonService.create({
      user: user._id , 
      status: "PAIED",
      priceWithoutTax: createReservationDto.price,
      experience: experience._id,
      qty: createReservationDto.qty,
    });


    const reservation = await this.reservationRepository.create({
      qty: createReservationDto.qty,
      dateOfExperience: createReservationDto.dateOfExperience,
      transaction: transaction._id,
      price: transaction.totalWithTax,
      location: createReservationDto.location,
      experience: createReservationDto.experience,
      status: ReservationStatus.RESERVED,
      guide: guide,
      user: user,
    });

    guide.reservations.push(reservation);
    experience.reservations.push(reservation);
    user.reservations.push(reservation);
    await Promise.all([
      await guide.save(),
      await experience.save(),
      await user.save(),
      await reservation.save(),
    ]);

    return reservation;
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async up_comping(guideId: string) {
    const today = new Date();
    const upComingResrvations = await this.reservationRepository
      .find({
        guide: guideId,
        dateOfExperience: { $gte: today },
      })
      .sort({ createdAt: -1 });

    return upComingResrvations;
  }

  async past_reservations(guideId: string) {
    const today = new Date();

    const pastReservations = await this.reservationRepository
      .find({
        guide: guideId,
        dateOfExperience: { $lt: today },
      })
      .sort({ createdAt: -1 });

    return pastReservations;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

 async getReservationsWithDate(experienceId:string ,date:Date ){
    return await this.reservationRepository
    .find({
      experience: experienceId,
      dateOfExperience: date,
    })
    .countDocuments()
  }



  async checkDateAvailability(
    dateParam: string,
    experienceId: string,
    requestedQty: number,
  ) {
    const date = new Date(dateParam);
    const resultDate = date;

    const experienceSlots = await this.slotsRepository.find({
      experience: experienceId,
    });

    let slot = experienceSlots.find((slotObj) => slotObj.day >= date.getDay());
    if (slot) {
      let days = slot.day - date.getDay(); // this for check what is the current full date , and what is the nearst day
      resultDate.setDate(resultDate.getDate() + days);
    } else {
      slot = experienceSlots[0]; //get the first day in experience calendar

      let days = date.getDay() - slot.day; // this for check what is the current full date , and what is the nearst day
      resultDate.setDate(resultDate.getDate() + days);
    }

    // check the counts of reservation at this date
    const reservationsCount = await this.getReservationsWithDate(experienceId , resultDate);

    return reservationsCount + requestedQty <= slot.qty ? true : false;
  }
}
