import { Module } from '@nestjs/common';
import { ExperienceCategoryController } from './experience-category.controller';
import { ExperienceCategoryService } from './experience-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExperienceCategory,
  ExperinceCategorySchema,
} from './entities/experience-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExperienceCategory.name, schema: ExperinceCategorySchema },
    ]),
  ],
  controllers: [ExperienceCategoryController],
  providers: [ExperienceCategoryService],
})
export class ExperienceCategoryModule {}
