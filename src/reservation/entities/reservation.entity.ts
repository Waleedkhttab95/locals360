import { Location } from "../../location/entities/location.entity";
import { User } from 'src/users/entities/user.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



export enum ReservationStatus {
  PENDING = 'PENDING',
  RESERVED = 'RESERVED',
  REJECT = 'REJECT',
  CANCELLED = 'CANCELLED',
  REFUND = 'REFUND',
  COMPLETED = 'COMPLETED',
}


export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({
    timestamps: true,
  })
export class Reservation {

    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Guide' })
    guide: Guide;
    @Prop()
    status: ReservationStatus;
    @Prop()
    dateOfExperience: Date;
    @Prop()
    price: string;
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Location' })
    location: Location;
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Experience' })
    experience: Experience;
    @Prop()
    qty: Number;
    @Prop()
    transaction: string;
    @Prop()
    approved: boolean

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);