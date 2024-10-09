import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import { Slots } from './entities/slots.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderByDistance } from 'geolib';
import { LocationService } from 'src/location/location.service';
import { Types } from 'mongoose';
import { ReservationService } from 'src/reservation/reservation.service';


@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceRepository: Model<Experience>,
    @InjectModel(Slots.name)
    private readonly slotsRepository: Model<Slots>,
    private locationService: LocationService,
    private reservationService: ReservationService
  ) {}

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
      city: createExperienceDto.city,
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
      populate: {
        path: 'city',
        select: '-_id',
      },
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
    const experience = await this.experienceRepository.findById(id)
    .populate('items slots')
    .populate({
      path: 'location',
      select: '-_id',
    populate: {
      path: 'city',
      select: '-_id',
    },
    });

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

  async getExperienceByCity(cityId: string) {
    const experiences = await this.experienceRepository.find({
      city: cityId,
    }).populate({
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
    populate: {
      path: 'city',
      select: '-_id',
    },
    })
    .populate({
      path: 'items',
      select: '-_id',
    })
    .select('-reservations');

    console.log(experiences)

    if (!experiences)
      throw new NotFoundException('Not found any experience :(');;


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
    listOfLocationsId = listOfLocationsId.slice(0, limit);

    // get all experiences based on the nearest locations id  
    
    

    let experiences =  await this.experienceRepository
      .find({
        location: { $in: listOfLocationsId },
      })
      
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
      populate: {
        path: 'city',
        select: '-_id',
      },
      })
      .populate({
        path: 'items',
        select: '-_id',
      })
      .select('-reservations -city');

    return experiences;
  }

  // Get Experience based on City Or Date Or Both
  async getExperienceBasedOnCityAndDate(cityId: string, date: string , qty: number) {

    //convert cityId to city ObjectId
    const cityObjectId = new Types.ObjectId(cityId);

    const experiences = await this.experienceRepository.find({
      city: cityObjectId,
    })
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
    populate: {
      path: 'city',
      select: '-_id',
    },
    })
    .populate({
      path: 'items',
      select: '-_id',
    })
    .select('-reservations');

    let availableExperiences = [];

    availableExperiences = await Promise.all(
      experiences.map(async (experience) => {
        // Check if the experience is available
        const isAvailable = await this.reservationService.checkDateAvailability(
          date,
          experience._id.toHexString(),
          qty
        );
        
        // Return the experience if it's available
        return isAvailable === true ? experience : null;
      })
    );

    console.log(availableExperiences)
    return availableExperiences.filter(experience => experience !== null);
  }

}


