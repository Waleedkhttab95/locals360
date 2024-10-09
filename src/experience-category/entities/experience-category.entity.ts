import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExperienceItemDocument = HydratedDocument<ExperienceCategory>;


@Schema({
  timestamps: true,
})
export class ExperienceCategory {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop({type: Boolean , default: true})
  isVisable: boolean
}

export const ExperinceCategorySchema = SchemaFactory.createForClass(ExperienceCategory);
