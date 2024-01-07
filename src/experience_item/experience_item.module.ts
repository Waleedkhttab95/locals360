import { Module } from '@nestjs/common';
import { ExperienceItemService } from './experience_item.service';
import { ExperienceItemController } from './experience_item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceItem, ExperinceItemSchema } from './entities/experience_item.entity';

@Module({
  controllers: [ExperienceItemController],
  providers: [ExperienceItemService],
  imports: [  MongooseModule.forFeature([
    { name: ExperienceItem.name, schema: ExperinceItemSchema },
  ]) ]
})
export class ExperienceItemModule {}
