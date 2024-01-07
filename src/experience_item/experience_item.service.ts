import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceItemDto } from "./dto/CreateExperienceItemDto";
import { UpdateExperienceItemDto } from './dto/update-experience_item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ExperienceItem } from './entities/experience_item.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExperienceItemService {
  constructor(
    @InjectModel(ExperienceItem.name)
    private readonly experienceItemRepository: Model<ExperienceItem>,
  ) {}

  async create(createExperienceItemDto: CreateExperienceItemDto) {
    const newitem = await this.experienceItemRepository.create(
      createExperienceItemDto,
    );

    await newitem.save();

    return newitem;
  }

  async findAll() {
    const items = await this.experienceItemRepository.find({isVisable:  { $ne: false }});

    return items;
  }

  async findOne(id: string) {
    const item = await this.experienceItemRepository.findById(id);
    if (!item) throw new NotFoundException('Item not found ');

    return item;
  }

  async update(id: string, updateExperienceItemDto: UpdateExperienceItemDto) {
    const updateItem = await this.experienceItemRepository.findByIdAndUpdate(
      id,
      updateExperienceItemDto,
    );
    if (!updateItem) throw new NotFoundException('Item not found ');

    const item = await this.experienceItemRepository.findById(id);
    return item;
  }

  async remove(id: number) {

    const updateItem = await this.experienceItemRepository.findByIdAndUpdate(
      id,
      {
        $set: {isVisable: false}
      }
    );
    if (!updateItem) throw new NotFoundException('Item not found ');

    return true;
  }
}
