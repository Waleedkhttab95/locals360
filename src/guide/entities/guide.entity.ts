import { Experience } from 'src/experience/entities/experience.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { GuideProfile } from './guide-profile.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type GuideDocument = HydratedDocument<Guide>;


@Schema({
    timestamps: true,
  })
export class Guide {
  

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'GuideProfile'})
    profile: GuideProfile ;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phoneNumber: string ;

    @Prop()
    firstName: string ;

    @Prop()
    lastName: string ; 

    @Prop({default: false})
    isActive: boolean;

    @Prop()
    gender: string ;

    @Prop()
    birthdate: string ; 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Experience'})
    experience: Experience; //ref

    @Prop([{type:mongoose.Schema.Types.ObjectId, ref: 'Reservation'}])
    reservations: Reservation[]
}

export const GuideSchema = SchemaFactory.createForClass(Guide);