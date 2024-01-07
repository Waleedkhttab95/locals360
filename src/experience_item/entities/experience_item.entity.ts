import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExperienceItemDocument = HydratedDocument<ExperienceItem>;


@Schema({
  timestamps: true,
})
export class ExperienceItem {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop({type: Boolean , default: true})
  isVisable: boolean
}

export const ExperinceItemSchema = SchemaFactory.createForClass(ExperienceItem);
