
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { City } from '../../city/entities/city.entity';

export type LocationDocument = HydratedDocument<Location>;

@Schema({
    timestamps: true,
  })
export class Location {

    @Prop()
    description: string;

    @Prop()
    long: string;

    @Prop()
    lat: string;
    
 
    @Prop({  type:mongoose.Schema.Types.ObjectId, ref: 'City' })
    city: City  
}

export const LocationSchema = SchemaFactory.createForClass(Location);