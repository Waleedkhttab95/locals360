import { Guide } from './guide.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GuideProfileDocument = HydratedDocument<GuideProfile>;


@Schema({
    timestamps: true,
  })
export class GuideProfile {
 

    @Prop()
    aboutMe: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Guide'})
    guide: Guide; //ref

    @Prop()
    profileImg: string ; 
    
}

export const GuideProfileSchema = SchemaFactory.createForClass(GuideProfile);