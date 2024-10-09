import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExperienceCategory } from './entities/experience-category.entity';
import { Model } from 'mongoose';
import { CreateExperienceCategoryDto } from './dto/CreateExperienceCategory.dto';
import { UpdateExperienceCategoryDto } from './dto/UpdateExperience.dto';

@Injectable()
export class ExperienceCategoryService {
  constructor(
    @InjectModel(ExperienceCategory.name)
    private readonly experienceCategoryRepository: Model<ExperienceCategory>,
  ) {}

  async create(createExperienceCategory: CreateExperienceCategoryDto) {
    const experienceCategory = await this.experienceCategoryRepository.create(createExperienceCategory);
    return experienceCategory;
  }

  async update(updateExperienceCategoryDto: UpdateExperienceCategoryDto) {}

  async getAll() {
    return await this.experienceCategoryRepository.find({ isVisable: true });
  }

  async getById(id: string) {}
}
