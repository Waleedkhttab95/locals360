import { Guide } from "src/guide/entities/guide.entity";
import { Slots } from "./slots.entity";
import { Location } from "../../location/entities/location.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { City } from "../../city/entities/city.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ExperienceItem } from "src/experience_item/entities/experience_item.entity";
import { Rating } from "src/rating/entities/rating.entity";

export type ExperienceDocument = HydratedDocument<Experience>;


@Schema({
    timestamps: true,
  })
export class Experience {

    @Prop()
    images: string[];

    @Prop()
    videos: string[];

    @Prop()
    keyWords: string[];

    @Prop()
    title: string;

    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Guide' })
    guide: Guide; //ref

    @Prop()
    description: string;

    @Prop([{ type:mongoose.Schema.Types.ObjectId, ref: 'ExperienceItem' }])
    items: ExperienceItem[]; 

    @Prop( { type:mongoose.Schema.Types.ObjectId, ref: 'Location' })
    location: Location; //ref

    @Prop([{ type:mongoose.Schema.Types.ObjectId, ref: 'Slots' }])
    slots: Slots[]; // 

    @Prop()
    policy: string;

    @Prop()
    requirements: string;

    @Prop({default: false})
    isActive: boolean;

    @Prop([{  type:mongoose.Schema.Types.ObjectId, ref: 'Reservation' }])
    reservations: Reservation[]


    @Prop([{  type:mongoose.Schema.Types.ObjectId, ref: 'Review' }])
    reviews: Rating[]
}


export const ExperienceSchema = SchemaFactory.createForClass(Experience);