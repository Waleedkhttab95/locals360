import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Experience } from "src/experience/entities/experience.entity";
import { User } from "src/users/entities/user.entity";

export type RatingDocument = HydratedDocument<Rating>;

export class Rating {
    @Prop()
    body: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Experience' })
    experience: Experience


    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({required : true , min : 0 , max: 10 })
    stars : number
}


export const RatingSchema = SchemaFactory.createForClass(Rating);