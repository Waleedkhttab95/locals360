import { Experience } from './experience.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export type SlotsDocument = HydratedDocument<Slots>;

@Schema({
  timestamps: true,
})
export class Slots {


  @Prop()
  // @Min(0, { message: 'Value must be greater than or equal to 0' })
  // @Max(6, { message: 'Value must be less than or equal to 6' })
  day: number;

  @Prop()
 // @Min(1, { message: 'Value must be greater than or equal to 1' })
  qty: number;

  @Prop({  type:mongoose.Schema.Types.ObjectId, ref: 'Experience' })
  experience: Experience
}

export const SlotsSchema = SchemaFactory.createForClass(Slots);