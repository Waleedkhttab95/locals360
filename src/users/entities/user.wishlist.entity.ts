import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';
import { HydratedDocument } from 'mongoose';
import { Experience } from '../../experience/entities/experience.entity';

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema({
  timestamps: true,
})
export class Wishlist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }])
  experienceList: Experience[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
