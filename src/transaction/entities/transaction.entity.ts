import { Location } from '../../location/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  status: string;
  @Prop()
  priceWithouTax: string;
  @Prop()
  tax: string;
  @Prop()
  priceWithTax: string;
  @Prop()
  totalWithTax: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' })
  experience: Experience;
  @Prop()
  qty: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
