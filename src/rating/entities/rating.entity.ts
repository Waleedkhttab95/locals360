import { Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Experience } from "src/experience/entities/experience.entity";
import { User } from "src/users/entities/user.entity";

export type RatingDocument = HydratedDocument<Rating>;

@Schema({
    timestamps: true,
  }) 
export class Rating {
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'User' , required: true})
    user: User;

    @Prop({ required: true })
    body: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Experience' })
    experience: Experience;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);