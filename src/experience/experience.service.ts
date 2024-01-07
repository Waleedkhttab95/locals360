import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import { CreateLocationDto } from '../location/dto/create-locaton.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Slots } from './entities/slots.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Location } from '../location/entities/location.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { City } from '../city/entities/city.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderByDistance } from 'geolib';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceRepository: Model<Experience>,
    @InjectModel(Slots.name)
    private readonly slotsRepository: Model<Slots>,
    @InjectModel(Reservation.name)
    private readonly reservationRepository: Model<Reservation>,
    private locationService: LocationService
  ) {}

  // S3 config
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  });

  async create(createExperienceDto: CreateExperienceDto) {
    const experience = await this.experienceRepository.create({
      images: createExperienceDto.images,
      videos: createExperienceDto.videos,
      title: createExperienceDto.title,
      description: createExperienceDto.description,
      items: createExperienceDto.items,
      policy: createExperienceDto.policy,
      requirements: createExperienceDto.requirements,
      guide: createExperienceDto.guide,
    });

    const location = await this.locationService.createLocation({
      description: createExperienceDto.locationDescription,
      long: createExperienceDto.long,
      lat: createExperienceDto.lat,
      city: createExperienceDto.city,
    });

    let slots: Slots[] = [];
    createExperienceDto.slots.forEach(async (slot) => {
      let newSlot = await this.slotsRepository.create({
        day: slot.day,
        qty: slot.qty,
        experience: experience,
      });

      await newSlot.save();
      slots.push(newSlot);
    });

    await this.sleep(10000);

    experience.location = location;
    experience.slots = slots;

    await experience.save();

    return true;
  }

  sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
  }



  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: `${uuid()}-${String(name)}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.S3_LOCATION_CONSTRAINT,
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    const experiences = await this.experienceRepository
      .find()
      .populate({
        path: 'guide',
        select: 'firstName lastName birthdate profile -_id',
      })
      .populate({
        path: 'slots',
        select: 'day qty -_id',
      })
      .populate({
        path: 'location',
        select: '-_id',
      })
      .populate({
        path: 'items',
        select: '-_id',
      })
      .select('-reservations');

    if (!experiences)
      throw new NotFoundException('Not found any experience :(');

    return experiences;
  }

  async findOne(id: string) {
    const experience = await this.experienceRepository.findById(id);

    if (!experience) throw new NotFoundException('Not found any experience :(');

    return experience;
  }

  async update(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
    userId: string,
  ) {
    const experience = await this.experienceRepository.findOne({
      id: id,
      guide: userId,
    });

    if (!experience) {
      throw new Error('experience not found');
    }

    Object.assign(experience, updateExperienceDto);
    await experience.save();
    return experience;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }

  async pauseExperience(userId: string, experienceId: string) {
    const experience = await this.experienceRepository.findOne({
      id: experienceId,
      guide: userId,
    });

    if (!experience) throw new UnauthorizedException('Unathorized action');

    experience.isActive = false;

    await experience.save();
    return experience;
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
    const reservationsCount = await this.reservationRepository
      .find({
        experience: experienceId,
        dateOfExperience: resultDate,
      })
      .countDocuments();

    return reservationsCount + requestedQty <= slot.qty ? true : false;
  }


  async getExperienceByCity(cityId: string) {
    const experiences = await this.experienceRepository.find({
      city: cityId,
    });

    return experiences;
  }

  async getExperienceBasedOnItems(itemCode: string) {
    const experiences = await this.experienceRepository.find({
      items: { $in: itemCode },
    });

    return experiences;
  }

  async getNearestExperiencesBasedOnUserLocation(
    userLong: string,
    userLat: string,
    limit: number,
  ) {
    const locations = await this.locationService.findAll();

    let locationFormatting = locations.map((location) => {
      return {
        _id: location._id,
        latitude: location.lat,
        longitude: location.long,
      };
    });

    const nearestLocations = orderByDistance(
      { latitude: userLat, longitude: userLong },
      locationFormatting,
    );

    let listOfLocationsId = nearestLocations.map(
      (location: any) => location._id,
    );

    const experiences = await this.experienceRepository
      .find({
        location: { $in: listOfLocationsId },
      })
      .limit(limit);

    return experiences;
  }
}
