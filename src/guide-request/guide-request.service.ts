import { Injectable } from '@nestjs/common';
import { CreateGuideRequestDto } from './dto/create-guide-request.dto';
import { UpdateGuideRequestDto } from './dto/update-guide-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GuideRequest, GuideRequestStatus } from './entities/GuideRequest';
import { MongoRepository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GuideRequestService {
  constructor(
    @InjectModel(GuideRequest.name)
    private readonly guideRequestRepository: Model<GuideRequest>,
  ) {}
  
 async create(createGuideRequestDto: CreateGuideRequestDto) {
    const newGuideRequest= await this.guideRequestRepository.create({
      guide : createGuideRequestDto.guideId , 
      description: createGuideRequestDto.description , 
      requestDate:  new Date() , 
      status :  GuideRequestStatus.PENDING
    })

    await newGuideRequest.save(); 

    return newGuideRequest ;
    
  }

  findAll() {
    return `This action returns all guideRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guideRequest`;
  }

  update(id: number, updateGuideRequestDto: UpdateGuideRequestDto) {
    return `This action updates a #${id} guideRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guideRequest`;
  }
}
