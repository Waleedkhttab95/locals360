import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';

@Schema({
  timestamps: true,
})
export class UserToken {
  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
