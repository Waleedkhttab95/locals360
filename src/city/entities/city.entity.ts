import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany, OneToOne } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;


@Schema({
    timestamps: true,
  })
export class City {


    @Prop()
    city: string;

    @Prop()
    country: string;


}

export const CitySchema = SchemaFactory.createForClass(City);