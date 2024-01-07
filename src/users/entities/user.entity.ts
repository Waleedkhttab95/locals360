
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { HydratedDocument } from 'mongoose';
import { Rating } from 'src/rating/entities/rating.entity';

export type UserDocument = HydratedDocument<User>;


@Schema({
    timestamps: true,
  })
export class User {


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

    @Prop()
    isActive: boolean;

    @Prop()
    gender: string ;

    @Prop()
    birthdate: string ; 

    @Prop()
    profileImg: string ; 

    @Prop({ type: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]})
    reservations: Reservation[]

    @Prop({ type: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Review' }]})
    reviews: Rating[]
}


export const UserSchema = SchemaFactory.createForClass(User);